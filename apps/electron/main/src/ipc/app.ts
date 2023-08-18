import { app, ipcMain } from "electron";

import { languages } from "@acme/lang";

/**
 * Init app ipcRenderer
 */
export const createAppIPCHandler = () => {
  ipcMain.handle("app.getVersion", () => app.getVersion());
  ipcMain.handle("app.getName", () => app.getName());
  ipcMain.handle("app.getLanguages", () => languages);
};
