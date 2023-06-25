import type cp from "child_process";
import { Menu, MenuItem, app, ipcMain, shell } from "electron";
import { createIPCHandler } from "electron-trpc/main";

import "./security-restrictions";
import { appRouter } from "@acme/api";

import globalApp from "./global";
import LibraryIPC from "./ipc/library";
import { syncIpc } from "./ipc/sync";
import { restoreOrCreateWindow } from "./mainWindow";
import { createWebServer } from "./src/createWebServer";
import createTray from "./src/tray";

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

app.on("will-quit", (e) => {
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
  if (nextjsWebChild) {
    nextjsWebChild.kill();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * hide dock
 */
if (process.platform === "darwin") {
  app.dock.hide();
}

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", () => {
  restoreOrCreateWindow().catch((err) => {
    throw err;
  });
});

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(async () => {
    await restoreOrCreateWindow().catch((err) => {
      throw err;
    });
  })
  .catch((e) => console.error("Failed create window:", e));

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

const menu = new Menu();

app.on("ready", () => {
  void restoreOrCreateWindow().then(async (win) => {
    createIPCHandler({ router: appRouter, windows: [win] });

    menu.append(
      new MenuItem({
        label: "Quite",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          globalApp.isQuite = false;
        },
      }),
    );

    // 创建 Web/Assets 服务
    nextjsWebChild = await createWebServer();
    if (!nextjsWebChild) {
      throw Error("NextJS child process was not created, exiting...");
    }
  });

  createTray();

  ipcMain.handle("open-url", (event, url: string) => {
    void shell.openExternal(url);
  });

  ipcMain.handle("get-env", () => {
    return {
      ip: process.env["IP"],
      web_port: process.env["WEB_PORT"],
      assets_port: process.env["ASSETS_PORT"],
      name: process.env["APP_NAME"],
      version: process.env["APP_VERSION"],
    };
  });

  LibraryIPC.assetsServer(ipcMain);
  LibraryIPC.choose(ipcMain);
  LibraryIPC.update(ipcMain);
  syncIpc(ipcMain);
});
