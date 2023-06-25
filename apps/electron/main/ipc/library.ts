import { readdirSync } from "fs";
import { join, sep } from "path";
import { dialog, type IpcMain } from "electron";

import { type LibraryAdd } from "@acme/api";
import { createAssetsServer } from "@acme/assets-server";
import { type Library } from "@acme/db";

// null: 无效的文件夹
const updateLibrary = (dir: string): LibraryAdd | null => {
  if (dir.endsWith(".library")) {
    // eagle
    const len = readdirSync(join(dir, "./images")).filter((item) => item.endsWith(".info")).length;
    const dirArr = dir.split(sep);

    return {
      name: dirArr[dirArr.length - 1],
      dir,
      fileCount: len,
      type: "eagle",
    };
  }

  return null;
};

const LibraryIPC = {
  choose: (ipcMain: IpcMain) => {
    ipcMain.handle("library-choose", (): LibraryAdd | null => {
      const res = dialog.showOpenDialogSync({
        title: "选择文件夹/库",
        properties: ["openDirectory"],
      });

      if (res) {
        const dir = res[0];

        return updateLibrary(dir);
      }

      return null;
    });
  },

  assetsServer: (ipcMain: IpcMain) => {
    ipcMain.handle("library-assets-server", (event, librarys: Library[]) => {
      createAssetsServer(librarys, Number(process.env["ASSETS_PORT"]));
    });
  },

  update: (ipcMain: IpcMain) => {
    ipcMain.handle("library-update", (event, dir: string): LibraryAdd | null => {
      return updateLibrary(dir);
    });
  },
};

export default LibraryIPC;
