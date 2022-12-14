import { join } from "path";
import { PrismaClient } from "@prisma/client";
import Folder from "./folder";
import chokidar from "chokidar";
import _ from "lodash";

const _path = join(process.env.LIBRARY, "./metadata.json");

export const initMetadata = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      Folder.add(prisma, file);
    })
    .on("change", (file) => {
      Folder.change(prisma, file);
    });
};
