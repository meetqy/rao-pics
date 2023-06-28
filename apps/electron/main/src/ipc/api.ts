import { join, sep } from "path";
import { ipcMain } from "electron";
import fg from "fast-glob";
import { readdirSync } from "fs-extra";

import { createAssetsServer } from "@acme/assets-server";
import { CONSTANT } from "@acme/constant";
import { type Library } from "@acme/db";

import { type HandleDirectoryReturn } from "../../../types";

export const createElectronApiIPCHandler = () => {
  ipcMain.handle("api.handleDirectory", (_e, dir: string): HandleDirectoryReturn => {
    const dirArr = dir.split(sep);
    const name = dirArr[dirArr.length - 1];

    // eagle
    if (dir.endsWith(".library")) {
      const len = readdirSync(join(dir, "./images")).filter((item) => item.endsWith(".info")).length;

      return {
        name,
        dir,
        fileCount: len,
        failCount: 0,
        type: "eagle",
      };
    } else {
      const entries = fg.sync(`${dir}/**/*.{${CONSTANT.EXT.join(",")}}`, { deep: 4 });
      const len = entries.length;
      if (len < 1) return null;

      return {
        name,
        dir,
        fileCount: len,
        failCount: 0,
        type: "folder",
      };
    }
  });

  ipcMain.handle("api.createAssetsServer", (_e, librarys?: Library[]) => {
    createAssetsServer(Number(process.env["ASSETS_PORT"]), librarys);
  });
};
