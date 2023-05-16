import { readdirSync } from "fs";
import { join } from "path";
import { dialog, type IpcMain } from "electron";

import { type LibraryAdd } from "@acme/api";

const updateLibrary = (dir: string): LibraryAdd | null => {
  if (dir.endsWith(".library")) {
    // eagle
    const len = readdirSync(join(dir, "./images")).filter((item) => item.endsWith(".info")).length;
    return {
      name: dir.replace(/(.*)\//, ""),
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

  update: (ipcMain: IpcMain) => {
    ipcMain.handle("library-update", (event, dir: string): LibraryAdd | null => {
      return updateLibrary(dir);
    });
  },
};

export default LibraryIPC;
