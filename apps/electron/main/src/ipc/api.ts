import { join, sep } from "path";
import { ipcMain } from "electron";

import { createAssetsServer } from "@acme/assets-server";
import curd from "@acme/curd";
import { type Library } from "@acme/db";
import startWatcher from "@acme/watch";

import { type HandleDirectoryReturn } from "../../../types";

export const createElectronApiIPCHandler = () => {
  ipcMain.handle("api.handleDirectory", async (_e, dir: string): Promise<HandleDirectoryReturn> => {
    const dirArr = dir.split(sep);
    const name = dirArr[dirArr.length - 1];

    // eagle
    if (dir.endsWith(".library")) {
      const lib = await curd.library.create({ dir, name, type: "eagle" });
      const count = await startWatcher({
        libraryId: lib.id,
        paths: join(dir, "./images/**/metadata.json"),
      });

      await curd.library.update({ id: lib.id, fileCount: count, failCount: 0 });

      return {
        id: lib.id,
        name,
        dir,
        fileCount: count,
        failCount: 0,
        type: "eagle",
      };
    } else {
      return null;
    }
  });

  ipcMain.handle("api.createAssetsServer", (_e, librarys?: Library[]) => {
    createAssetsServer(Number(process.env["ASSETS_PORT"]), librarys);
  });
};
