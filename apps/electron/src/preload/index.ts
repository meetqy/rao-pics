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

      showErrorBox: (title: string, content: string) =>
        ipcRenderer.invoke("dialog.showErrorBox", title, content),
    });

    /**
     * window.shell same as shell.xxx
     */
    contextBridge.exposeInMainWorld("shell", {
      openExternal: (url: string, options?: Electron.OpenExternalOptions) =>
        ipcRenderer.invoke("shell.openExternal", url, options),
      showItemInFolder: (path: string) =>
        ipcRenderer.invoke("shell.showItemInFolder", path),
    });

    exposeElectronTRPC();
  } catch (error) {
    console.error(error);
  }
}
