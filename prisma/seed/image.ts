import { join } from "path";
import { PrismaClient } from "@prisma/client";
import chokidar from "chokidar";
import { readJSONSync } from "fs-extra";

const handleImage = (json) => {
  return {
    ...json,
    palettes: JSON.stringify(json.palettes),
    folders: JSON.stringify(json.folders),
    tags: JSON.stringify(json.tags),
  };
};

const _path = join(process.env.LIBRARY, "./images/**/metadata.json");

export const initImage = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      const json = readJSONSync(file);

      prisma.image
        .upsert({
          where: {
            id: json.id,
          },
          update: handleImage(json),
          create: handleImage(json),
        })
        .then((image) => {
          console.log("init image with id: ", image.id);
        });
    })
    .on("change", (file) => {
      const json = readJSONSync(file);

      prisma.image
        .update({
          where: {
            id: json.id,
          },
          data: handleImage(json),
        })
        .then((image) => {
          console.log("update image with id: ", image.id);
        });
    })
    .on("unlink", (file) => {
      const id = file
        .match(/\/(\d|[a-zA-Z])+.info/)[0]
        .split(".")[0]
        .replace("/", "");

      prisma.image
        .delete({
          where: {
            id,
          },
        })
        .then((image) => {
          console.log("delete image with id: ", image.id);
        });
    });
};
