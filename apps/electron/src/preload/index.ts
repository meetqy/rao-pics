import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    exposeElectronTRPC();

    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // window.electron = electronAPI;
  // window.api = api;
}
