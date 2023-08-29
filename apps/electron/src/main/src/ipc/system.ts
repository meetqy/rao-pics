import { dialog, ipcMain, shell } from "electron";

export const createSystemIPC = () => {
  // dialog
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

  ipcMain.handle(
    "dialog.showErrorBox",
    (_e, title: string, content: string) => {
      dialog.showErrorBox(title, content);
    },
  );

  // shell
  ipcMain.handle(
    "shell.openExternal",
    (_e, url: string, options?: Electron.OpenExternalOptions) =>
      shell.openExternal(url, options),
  );
  ipcMain.handle("shell.showItemInFolder", (_e, path: string) =>
    shell.showItemInFolder(path),
  );
};
