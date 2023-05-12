import { readdirSync } from "fs";
import { join } from "path";
import { dialog, type IpcMain } from "electron";

import { type LibraryAdd } from "@acme/api";

export const chooseLibraryIpc = (ipcMain: IpcMain) => {
  ipcMain.handle("choose-folder", (): LibraryAdd | null => {
    const res = dialog.showOpenDialogSync({
      title: "选择文件夹/库",
      properties: ["openDirectory"],
    });

    if (res) {
      const dir = res[0];

      if (dir.endsWith(".library")) {
        // eagle
        const len = readdirSync(join(dir, "./images")).length;
        return {
          name: dir.replace(/(.*)\//, ""),
          dir,
          fileCount: len,
          type: "eagle",
        };
      }

      return null;
    }

    return null;
  });
};
