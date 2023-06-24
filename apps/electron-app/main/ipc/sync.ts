import path from "path";
import { type IpcMain } from "electron";
import log from "electron-log";

import { type Library } from "@acme/db";
import { start as eagleStart } from "@acme/eagle";

log.transports.file.resolvePathFn = (variables) => {
  return path.join(variables.electronDefaultDir || "", variables.fileName || "main.log");
};

export const syncIpc = (ipcMain: IpcMain) => {
  ipcMain.on("sync", (event, library: Library) => {
    void eagleStart({
      library,
      emit: (e) => {
        event.sender.send("on-eagle-sync-progress", e);
      },
      onError: (err) => {
        log.error("@acme/eagle", err);
      },
    });
  });
};
