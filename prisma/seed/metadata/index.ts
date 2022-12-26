import { join } from "path";
import { PrismaClient } from "@prisma/client";
import Folder from "./folder";
import chokidar from "chokidar";
import _ from "lodash";
import TagGroup from "./tagsGroups";
import { readJSONSync } from "fs-extra";

const _path = join(process.env.LIBRARY, "./metadata.json");

export const initMetadata = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      const json = readJSONSync(file);

      Folder.add(prisma, json);
      TagGroup.add(prisma, json);
    })
    .on("change", (file) => {
      const json = readJSONSync(file);

      Folder.change(prisma, json);
      TagGroup.change(prisma, json);
    });
};
