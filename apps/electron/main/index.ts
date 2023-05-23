import { app, ipcMain, shell, type IpcMain } from "electron";
import { getPort } from "get-port-please";
import ip from "ip";

import "./security-restrictions";
import cp from "child_process";
import { join } from "path";
import { callProcedure } from "@trpc/server";

import { appRouter, createContext } from "@acme/api";

import type { IPCRequestOptions } from "../types";
import LibraryIPC from "./ipc/library";
import { syncIpc } from "./ipc/sync";
import { pageUrl, restoreOrCreateWindow } from "./mainWindow";

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

  void (async () => {
    const _ip = ip.address();
    const _web_port = (await getPort({ portRange: [9620, 9624], port: 9620 })).toString();
    const _assets_port = (await getPort({ portRange: [9625, 9629], port: 9625 })).toString();

    // Init env variables
    process.env["IP"] = _ip;
    process.env["WEB_PORT"] = _web_port;
    process.env["ASSETS_PORT"] = _assets_port;

    if (app.isPackaged) {
      cp.fork(join(process.resourcesPath, "apps/nextjs/server.js"), {
        env: {
          PORT: (_web_port || 9620).toString(),
          NEXT_PUBLIC_IP: _ip,
          NEXT_PUBLIC_WEB_PORT: _web_port,
          NEXT_PUBLIC_ASSETS_PORT: _assets_port,
        },
      });
    } else {
      const nextjs = join(process.cwd(), "../nextjs");
      cp.spawn("npx", ["next", "dev"], {
        cwd: nextjs,
        stdio: "inherit",
        env: {
          // 不能省略，否则会报错
          ...process.env,
          PORT: (_web_port || 9620).toString(),
          NEXT_PUBLIC_IP: _ip,
          NEXT_PUBLIC_WEB_PORT: _web_port,
          NEXT_PUBLIC_ASSETS_PORT: _assets_port,
        },
      });
    }
  })();
});
