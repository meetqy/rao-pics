import type cp from "child_process";
import { app, ipcMain, shell } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import ip from "ip";

import { appRouter } from "@acme/api";
import { closeAssetsServer } from "@acme/assets-server";

import globalApp from "./global";
import LibraryIPC from "./ipc/library";
import { syncIpc } from "./ipc/sync";
import { getWindow } from "./mainWindow";
import { createWebServer } from "./src/createWebServer";
import createMenu from "./src/menu";
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
  void getWindow();
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

app.on("before-quit", (e) => {
  if (!globalApp.isQuite) {
    e.preventDefault();
  }
});

app.on("quit", () => {
  closeAssetsServer();
  nextjsWebChild?.kill();
});

app.on("browser-window-focus", () => {
  void (async () => {
    // 如果 ip 不相同，并且已经启动才需要重启
    // web server 首次启动在 activate 中触发
    if (nextjsWebChild && process.env["IP"] != ip.address()) {
      nextjsWebChild = await createWebServer(nextjsWebChild);
    }
  })();
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", () => {
  void (async () => {
    nextjsWebChild = await createWebServer(nextjsWebChild);
  })();

  getWindow().catch((err) => {
    throw err;
  });
});

// 创建菜单
createMenu();

if (process.platform === "darwin") {
  // 隐藏 docker
  app.dock.hide();
}

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(() => {
    getWindow()
      .then(async (win) => {
        createIPCHandler({ router: appRouter, windows: [win] });

        // 托盘图标
        createTray();

        // 创建 Web/Assets 服务
        nextjsWebChild = await createWebServer();
        if (!nextjsWebChild) {
          throw Error("NextJS child process was not created, exiting...");
        }
      })
      .catch((err) => {
        throw err;
      });
  })
  .catch((e) => console.error("Failed create window:", e));

app.on("ready", () => {
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
