import { app, ipcMain } from "electron";

export const createAppIPCHandler = () => {
  ipcMain.handle("app.getVersion", () => app.getVersion());
  ipcMain.handle("app.getName", () => app.getName());
};
