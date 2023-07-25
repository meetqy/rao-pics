import { join, sep } from "path";
import { ipcMain } from "electron";
import fg from "fast-glob";

import { CONSTANT } from "@acme/constant";
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
      // folder 普通文件夹
      const lib = await curd.library.create({ dir, name, type: "folder" });
      // 只需要监听已支持的扩展名
      const paths = join(dir, "**", `*.{${CONSTANT.EXT.join(",")}}`).replace(/\\/g, "/");
      // 最多支持嵌套 4 层, 目录三层
      const entries = fg.sync(paths, {
        deep: 4,
      });

      void startWatcher({
        libraryId: lib.id,
        paths,
        options: {
          depth: 3,
        },
      });

      return {
        id: lib.id,
        name,
        dir,
        type: "folder",
        count: entries.length,
      };
    }
  });

  ipcMain.handle("api.createAssetsServer", (_e, librarys?: Library[]) => {
    createAssetsServer(Number(process.env["ASSETS_PORT"]), librarys);
  });
};
