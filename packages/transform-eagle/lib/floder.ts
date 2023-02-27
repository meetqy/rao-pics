import { join } from "path";
import * as chokidar from "chokidar";
import { getPrisma } from "./prisma";
import { readJsonSync } from "fs-extra";
import { Folder } from "@prisma/client";
import { logger } from "@eagleuse/utils";
import * as _ from "lodash";
import { trigger } from "./trigger";

const prisma = getPrisma();
const _wait = 3000;

// 多级嵌套转为一级
const demotionFolder = (folders: EagleUse.Folder[]): Folder[] => {
  const newFolders = [];

  const callback = (item) => {
    (item.children || (item.children = [])).map((v) => {
      v.pid = item.id;
      callback(v);
    });

    delete item.children;
    delete item.tags;
    newFolders.push(item);
  };

  folders.map((v) => callback(v));
  return newFolders;
};

const handleFloder = (file: string) => {
  const json = readJsonSync(file);
  const folders = demotionFolder(json["folders"]);

  folders.forEach((folder) => {
    prisma.folder
      .upsert({
        where: { id: folder.id },
        update: folder,
        create: folder,
      })
      .catch((e) => logger.info(e, "Folder error: "));

    trigger();
  });
};

const _debounce = _.debounce(handleFloder, _wait);

const watchFloder = (LIBRARY: string) => {
  const file = join(LIBRARY, "./metadata.json");

  chokidar.watch(file).on("add", _debounce).on("change", _debounce);
};

export default watchFloder;
