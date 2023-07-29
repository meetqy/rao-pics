import type cp from "child_process";
import * as Sentry from "@sentry/electron";
import { app, Menu, MenuItem } from "electron";
import { createIPCHandler } from "electron-trpc/main";

import startWatcher from "@acme/watch";

import "./security-restrictions";

import { join } from "path";
import fg from "fast-glob";

import { appRouter } from "@acme/api";
import curd from "@acme/curd";
import { createSqlite } from "@acme/db";

import globalApp from "./global";
import { restoreOrCreateWindow } from "./mainWindow";
import { createAssetsServer } from "./src/createAssetsServer";
import { createWebServer } from "./src/createWebServer";
import createAllIPCHandler from "./src/ipc";
import createMenu from "./src/menu";
import createTray from "./src/tray";
import { getAndUpdateConfig } from "./src/utils/config";

if (app.isPackaged) {
  /**
   * Init db.sqlite
   */
  createSqlite(join(process.resourcesPath, "./packages/db/prisma/db.sqlite"));
}

/**
 * Create all ipcHander in 'src/ipc/xxx.ts'
 */
createAllIPCHandler();

/**
 * Create Menu
 */
createMenu();

/**
 * Hide dock
 */
if (process.platform === "darwin") {
  app.dock.hide();
}

let nextjsWebChild: cp.ChildProcess | undefined;

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", () => {
  restoreOrCreateWindow().catch((err) => {
    throw err;
  });
});

app.on("before-quit", (e) => {
  if (!globalApp.isQuite) {
    e.preventDefault();
  }
});

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * App quit
 */
app.on("quit", () => {
  if (nextjsWebChild) {
    nextjsWebChild.kill();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", () => {
  restoreOrCreateWindow().catch((err) => {
    throw err;
  });
});

app.on("browser-window-focus", () => {
  void (async () => {
    // 如果 ip 不相同，并且已经启动才需要重启
    // web server 首次启动在 activate 中触发
    const { ip } = await getAndUpdateConfig();

    if (nextjsWebChild && process.env["IP"] != ip) {
      nextjsWebChild.kill();
      nextjsWebChild = createWebServer(nextjsWebChild);
    }
  })();
});

/**
 * Install React devtools in dev mode
 * works, but throws errors so it's commented out until these issues are resolved:
 * - https://github.com/MarshallOfSound/electron-devtools-installer/issues/220
 * - https://github.com/electron/electron/issues/32133
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app
//     .whenReady()
//     .then(() => import("electron-devtools-installer"))
//     .then(async ({ default: installExtension, REACT_DEVELOPER_TOOLS }) => {
//       await installExtension(REACT_DEVELOPER_TOOLS, {
//         loadExtensionOptions: {
//           allowFileAccess: true,
//         },
//       });
//     })
//     .catch((e) => console.error("Failed install extension:", e));
// }

/**
 * Sentry init
 */
Sentry.init({
  dsn: "https://178a415c4ef2421a8f52b6c4041319af@o4505321607397376.ingest.sentry.io/4505321612705792",
  debug: import.meta.env.DEV,
});

app.on("ready", () => {
  createTray();

  // Init menu and cmd+q disabled.
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Quite",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        globalApp.isQuite = false;
      },
    }),
  );

  void restoreOrCreateWindow().then((win) => {
    createIPCHandler({ router: appRouter, windows: [win] });
  });
});

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(() => {
    void (async () => {
      // 创建文件监听
      const libs = await curd.library.get({});

      for (const lib of libs) {
        if (lib.type === "eagle") {
          /**
           * 这里只是简单的处理，关闭之后操作了 Eagle，无法同步的问题。
           * 正常来说，关闭软件之后，去操作 eagle, 没有记录到更新情况，不属于软件本身 Bug。
           * https://github.com/rao-pics/core/issues/299
           */
          const paths = join(lib.dir, "images", "**", "metadata.json").replace(/\\/g, "/");
          const entries = fg.sync(paths);

          const failImages = await curd.fail.get({ libraryId: lib.id });
          const exitsImages = await curd.image.get({ libraryId: lib.id });

          if (failImages.length + exitsImages.length != entries.length) {
            const exitsImagesPaths = exitsImages.map((item) => {
              const src = item.path.replace(/\.info(.*?)+/, ".info/metadata.json");
              return join(lib.dir, src).replace(/\\/g, "/");
            });

            entries.forEach((entry) => {
              if (exitsImagesPaths.includes(entry)) {
                void curd.pending.upsert({ libraryId: lib.id, path: entry, type: "update" });
              } else {
                void curd.pending.upsert({ libraryId: lib.id, path: entry, type: "create" });
              }
            });
          }
          // END

          void startWatcher({
            libraryId: lib.id,
            paths,
            options: {
              ignoreInitial: true,
            },
          });
        }
      }

      // Init config assign to process.env
      await getAndUpdateConfig();

      // 创建 Web 服务
      nextjsWebChild = createWebServer();
      if (!nextjsWebChild) {
        throw Error("NextJS child process was not created, exiting...");
      }

      // 创建 Assets 服务
      createAssetsServer(Number(process.env["ASSETS_PORT"]), libs);
    })();
  })
  .catch((e) => console.error("Failed create window:", e));
