import { contextBridge, ipcRenderer, type ContextBridge, type IpcRenderer } from "electron";

import { type Library } from "@acme/db";

import type { IPCRequestOptions } from "../types";

export const exposeElectronTRPC = ({ contextBridge, ipcRenderer }: { contextBridge: ContextBridge; ipcRenderer: IpcRenderer }) => {
  return contextBridge.exposeInMainWorld("electronTRPC", {
    rpc: (opts: IPCRequestOptions) => ipcRenderer.invoke("electron-trpc", opts),
  });
};

process.once("loaded", () => {
  exposeElectronTRPC({ contextBridge, ipcRenderer });

  contextBridge.exposeInMainWorld("electronAPI", {
    chooseFolder: () => ipcRenderer.invoke("choose-folder"),
    sync: (library: Library) => ipcRenderer.send("sync", library),
  });
  // If you expose something here, you get window.something in the React app
  // type it in types/exposedInMainWorld.d.ts to add it to the window type
  // contextBridge.exposeInMainWorld("something", {
  //   exposedThing: "this value was exposed via the preload file",
  // });
});
