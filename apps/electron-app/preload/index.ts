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

  contextBridge.exposeInMainWorld("electronAPI", {
    library: {
      choose: () => ipcRenderer.invoke("library-choose"),
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
    getEnv: () => ipcRenderer.invoke("get-env"),
  });

  contextBridge.exposeInMainWorld("electronENV", {
    ip: process.env["IP"],
    web_port: process.env["WEB_PORT"],
    assets_port: process.env["ASSETS_PORT"],
    name: process.env["APP_NAME"],
    version: process.env["APP_VERSION"],
  });
});
