import { join, sep } from "path";
import { ipcMain } from "electron";
import fg from "fast-glob";

import curd from "@acme/curd";
import { type Library } from "@acme/db";
import startWatcher from "@acme/watch";

import { type HandleDirectoryReturn } from "../../../types";
import { createAssetsServer } from "../createAssetsServer";

export const createElectronApiIPCHandler = () => {
  ipcMain.handle("api.handleDirectory", async (_e, dir: string): Promise<HandleDirectoryReturn> => {
    const dirArr = dir.split(sep);
    const name = dirArr[dirArr.length - 1];

    // eagle
    if (dir.endsWith(".library")) {
      const lib = await curd.library.create({ dir, name, type: "eagle" });
      const paths = join(dir, "images", "**", "metadata.json").replace(/\\/g, "/");

      const entries = fg.sync(paths);
      void startWatcher({
        libraryId: lib.id,
        paths,
      });

      return {
        id: lib.id,
        name,
        dir,
        type: "eagle",
        count: entries.length,
      };
    } else {
      return null;
    }
  });

  ipcMain.handle("api.createAssetsServer", (_e, librarys?: Library[]) => {
    createAssetsServer(Number(process.env["ASSETS_PORT"]), librarys);
  });
};
