import { ipcMain, shell } from "electron";

export const createShellIPCHandler = () => {
  ipcMain.handle("shell.openExternal", (_e, url: string, options?: Electron.OpenExternalOptions) => shell.openExternal(url, options));
  ipcMain.handle("shell.showItemInFolder", (_e, path: string) => shell.showItemInFolder(path));
};
