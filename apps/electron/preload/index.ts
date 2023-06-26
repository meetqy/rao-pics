import { type TRPCResponseMessage } from "@trpc/server/rpc";
import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";
import { type RendererGlobalElectronTRPC } from "types";

import { type Library } from "@acme/db";
import { type EagleEmit, type EagleEmitOption } from "@acme/eagle";

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

  contextBridge.exposeInMainWorld("app", {
    getVersion: () => ipcRenderer.invoke("app.getVersion"),
    getName: () => ipcRenderer.invoke("app.getName"),
  });

  contextBridge.exposeInMainWorld("dialog", {
    showOpenDialog: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke("dialog.showOpenDialog", options),
  });

  contextBridge.exposeInMainWorld("electronAPI", {
    handleDirectory: (dir: string) => ipcRenderer.invoke("api.handleDirectory", dir),

    library: {
      update: (dir: string) => ipcRenderer.invoke("library-update", dir),
      assetsServer: (librarys: Library[]) => ipcRenderer.invoke("library-assets-server", librarys),
    },
    sync: (library: Library) => ipcRenderer.send("sync", library),
    onEagleSyncProgress: (listener: EagleEmit) =>
      ipcRenderer.on("on-eagle-sync-progress", (_e, ...args) => {
        const options = args[0] as EagleEmitOption;
        listener(options);
      }),
    openUrl: (url: string) => ipcRenderer.invoke("open-url", url),
  });
});
