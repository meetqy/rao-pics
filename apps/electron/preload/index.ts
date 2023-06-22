import { type TRPCResponseMessage } from "@trpc/server/rpc";
import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";
import { type RendererGlobalElectronTRPC } from "types";

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
});
