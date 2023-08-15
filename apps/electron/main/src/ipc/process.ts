import { ipcMain } from "electron";

/**
 * Init app ipcRenderer
 */
export const createProcessIPCHandler = () => {
  ipcMain.handle("process.platform", () => process.platform);
};
