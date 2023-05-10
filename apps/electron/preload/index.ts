import { contextBridge, ipcRenderer } from "electron";
import type { IpcRenderer, ContextBridge } from "electron";
import type { IPCRequestOptions } from "../types";

export const exposeElectronTRPC = ({
  contextBridge,
  ipcRenderer,
}: {
  contextBridge: ContextBridge;
  ipcRenderer: IpcRenderer;
}) => {
  return contextBridge.exposeInMainWorld("electronTRPC", {
    rpc: (opts: IPCRequestOptions) => ipcRenderer.invoke("electron-trpc", opts),
  });
};

process.once("loaded", () => {
  exposeElectronTRPC({ contextBridge, ipcRenderer });
  // If you expose something here, you get window.something in the React app
  // type it in types/exposedInMainWorld.d.ts to add it to the window type
  // contextBridge.exposeInMainWorld("something", {
  //   exposedThing: "this value was exposed via the preload file",
  // });
});
