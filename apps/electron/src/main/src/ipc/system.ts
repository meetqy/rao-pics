import type { BrowserWindow } from "electron";
import { app, dialog, ipcMain } from "electron";

export const createSystemIPC = (window: BrowserWindow) => {
  ipcMain.handle(
    "dialog.showOpenDialog",
    (_e, options: Electron.OpenDialogOptions) =>
      dialog.showOpenDialogSync(options),
  );

  ipcMain.handle(
    "dialog.showMessageBox",
    (_e, options: Electron.MessageBoxOptions) =>
      dialog.showMessageBoxSync(options),
  );

  ipcMain.handle("close", () => window.close());
};
