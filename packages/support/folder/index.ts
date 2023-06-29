import fg from "fast-glob";

import { CONSTANT, type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { type Library } from "@acme/db";

export const start = async (library: Library) => {
  const entries = fg.sync(`${library.dir}/**/*.{${CONSTANT.EXT.join(",")}}`);

  if (entries.length > 0) {
    for (const entry of entries) {
      const parts = entry.split("/");

      const folder = parts[parts.length - 2];
      const name = parts[parts.length - 1];
      if (!name) continue;
      if (!folder) continue;

      await curd.image.create({
        libraryId: library.id,
        name,
        size: 0,
        createTime: new Date(),
        lastTime: new Date(),
        ext: entry.split(".").pop() as Constant["ext"],
        width: 0,
        height: 0,
        duration: 0,
        noThumbnail: false,
        folders: [{ name: folder }],
      });
    }
  }
};
