import { dialog, ipcMain } from "electron";

export const createSystemIPC = () => {
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
};
