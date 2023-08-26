import { contextBridge, ipcRenderer } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);

    /**
     * window.dialog same as dialog.xxx
     */
    contextBridge.exposeInMainWorld("dialog", {
      showOpenDialog: (options: Electron.OpenDialogOptions) =>
        ipcRenderer.invoke("dialog.showOpenDialog", options),
      showMessageBox: (options: Electron.OpenDialogOptions) =>
        ipcRenderer.invoke("dialog.showMessageBox", options),
    });

    /**
     * window.process same as process.xxx
     */
    contextBridge.exposeInMainWorld("process", {
      platform: process.platform,
    });

    /**
     * window.close same as close()
     */
    contextBridge.exposeInMainWorld("close", () => ipcRenderer.send("close"));

    exposeElectronTRPC();
  } catch (error) {
    console.error(error);
  }
}
