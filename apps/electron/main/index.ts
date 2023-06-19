import { app, ipcMain, nativeTheme, shell, type IpcMain, type Tray } from "electron";

import "./security-restrictions";
import type cp from "child_process";
import { callProcedure } from "@trpc/server";

import { appRouter, createContext } from "@acme/api";
import { closeAssetsServer } from "@acme/assets-server";

import type { IPCRequestOptions } from "../types";
import LibraryIPC from "./ipc/library";
import { syncIpc } from "./ipc/sync";
import { pageUrl, restoreOrCreateWindow } from "./mainWindow";
import { createWebServer } from "./src/createWebServer";
import createMenu from "./src/menu";
import createTray, { getTrayIcon } from "./src/tray";

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
  e.preventDefault();
});

app.on("quit", () => {
  closeAssetsServer();
  nextjsWebChild?.kill();
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", () => {
  void (async () => {
    nextjsWebChild = await createWebServer(nextjsWebChild);
  })();

  restoreOrCreateWindow().catch((err) => {
    throw err;
  });
});

let tray: Tray;
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
    restoreOrCreateWindow()
      .then(async () => {
        // 托盘图标
        tray = createTray();

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

nativeTheme.on("updated", () => {
  tray && tray.setImage(getTrayIcon());
});

function validateSender(frame: Electron.WebFrameMain) {
  const frameUrlObj = new URL(frame.url);
  const pageUrlObj = new URL(pageUrl);

  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    // during dev
    if (frameUrlObj.host === pageUrlObj.host) return true;
  } else {
    // during prod and test
    if (frameUrlObj.protocol === "file:") return true;
  }

  return false;
}

export function createIPCHandler({ ipcMain }: { ipcMain: IpcMain }) {
  // https://www.electronjs.org/docs/latest/tutorial/security#17-validate-the-sender-of-all-ipc-messages
  ipcMain.handle("electron-trpc", (event: Electron.IpcMainInvokeEvent, opts: IPCRequestOptions) => {
    if (!validateSender(event.senderFrame)) return null;
    return resolveIPCResponse(opts);
  });

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
}

// functional happy path, types get inferred
async function resolveIPCResponse(opts: IPCRequestOptions) {
  const { path, type, input } = opts;
  const { procedures } = appRouter._def;
  const ctx = createContext();

  try {
    const output = await callProcedure({
      ctx,
      path,
      procedures,
      rawInput: input,
      type,
    });

    return {
      result: output,
      status: "success",
    };
  } catch (e) {
    return {
      result: e,
      status: "error",
    };
  }
}

app.on("ready", () => {
  createIPCHandler({ ipcMain });
});
