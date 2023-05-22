import { contextBridge, ipcRenderer, type ContextBridge, type IpcRenderer } from "electron";

import { type Library } from "@acme/db";
import { type EagleEmit, type EagleEmitOption } from "@acme/eagle";

import type { IPCRequestOptions } from "../types";

export const exposeElectronTRPC = ({ contextBridge, ipcRenderer }: { contextBridge: ContextBridge; ipcRenderer: IpcRenderer }) => {
  return contextBridge.exposeInMainWorld("electronTRPC", {
    rpc: (opts: IPCRequestOptions) => ipcRenderer.invoke("electron-trpc", opts),
  });
};

process.once("loaded", () => {
  exposeElectronTRPC({ contextBridge, ipcRenderer });

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
  });
  // If you expose something here, you get window.something in the React app
  // type it in types/exposedInMainWorld.d.ts to add it to the window type
  // contextBridge.exposeInMainWorld("something", {
  //   exposedThing: "this value was exposed via the preload file",
  // });
});
