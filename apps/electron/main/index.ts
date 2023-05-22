import { app, ipcMain, type IpcMain } from "electron";

import "./security-restrictions";
import cp from "child_process";
import { join } from "path";
// import { start } from "repl";
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

  if (app.isPackaged) {
    cp.fork(join(process.resourcesPath, "apps/nextjs/server.js"));
  }
});
