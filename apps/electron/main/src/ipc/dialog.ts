import { dialog, ipcMain } from "electron";

/**
 * Init app ipcRenderer
 */
export const createDialogIPCHandler = () => {
  ipcMain.handle("dialog.showOpenDialog", (_e, options: Electron.OpenDialogOptions) => dialog.showOpenDialogSync(options));
};
