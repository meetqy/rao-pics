import { type TRPCResponseMessage } from "@trpc/server/rpc";
import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";
import { type RendererGlobalElectronTRPC } from "types";

import { type Library } from "@acme/db";

const exposeElectronTRPC = () => {
  const electronTRPC: RendererGlobalElectronTRPC = {
    sendMessage: (operation: unknown) => ipcRenderer.send("electron-trpc", operation),
    onMessage: (callback: (args: TRPCResponseMessage) => void) =>
      ipcRenderer.on("electron-trpc", (_event: IpcRendererEvent, args: unknown) => callback(args as TRPCResponseMessage)),
  };

  contextBridge.exposeInMainWorld("electronTRPC", electronTRPC);
};

process.once("loaded", () => {
  exposeElectronTRPC();

  /**
   * window.app same as app.xxx
   */
  contextBridge.exposeInMainWorld("app", {
    getVersion: () => ipcRenderer.invoke("app.getVersion"),
    getName: () => ipcRenderer.invoke("app.getName"),
  });

  contextBridge.exposeInMainWorld("process", {
    getPlatform: () => ipcRenderer.invoke("process.platform"),
  });

  /**
   * window.dialog same as dialog.xxx
   */
  contextBridge.exposeInMainWorld("dialog", {
    showOpenDialog: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke("dialog.showOpenDialog", options),
    showMessageBox: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke("dialog.showMessageBox", options),
  });

  /**
   * window.shell same as shell.xxx
   */
  contextBridge.exposeInMainWorld("shell", {
    openExternal: (url: string, options?: Electron.OpenExternalOptions) => ipcRenderer.invoke("shell.openExternal", url, options),
    showItemInFolder: (path: string) => ipcRenderer.invoke("shell.showItemInFolder", path),
  });

  contextBridge.exposeInMainWorld("electronAPI", {
    handleDirectory: (dir: string) => ipcRenderer.invoke("api.handleDirectory", dir),
    createAssetsServer: (librarys?: Library[]) => ipcRenderer.invoke("api.createAssetsServer", librarys),
  });
});
