import { join, sep } from "path";
import { ipcMain } from "electron";
import { readdirSync } from "fs-extra";

import { type HandleDirectoryReturn } from "../../../types";

export const createElectronApiIPCHandler = () => {
  ipcMain.handle("api.handleDirectory", (_e, dir: string): HandleDirectoryReturn => {
    // eagle
    if (dir.endsWith(".library")) {
      const len = readdirSync(join(dir, "./images")).filter((item) => item.endsWith(".info")).length;
      const dirArr = dir.split(sep);

      return {
        name: dirArr[dirArr.length - 1],
        dir,
        fileCount: len,
        failCount: 0,
        type: "eagle",
      };
    }

    return null;
  });
};
