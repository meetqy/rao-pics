import { ipcMain, shell } from "electron";

export const createShellIPCHandler = () => {
  ipcMain.handle("shell.openExternal", (_e, url: string, options?: Electron.OpenExternalOptions) => shell.openExternal(url, options));
};
