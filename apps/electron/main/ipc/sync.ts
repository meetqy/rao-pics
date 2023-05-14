import { type IpcMain } from "electron";

import { type Library } from "@acme/db";
import { start as eagleStart } from "@acme/eagle";

export const syncIpc = (ipcMain: IpcMain) => {
  ipcMain.on("sync", (event, library: Library) => {
    void eagleStart(library, (e) => {
      event.sender.send("on-sync", e);
    });
  });
};
