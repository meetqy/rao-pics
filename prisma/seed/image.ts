import { join } from "path";
import { PrismaClient } from "@prisma/client";
import chokidar from "chokidar";
import { readJSONSync } from "fs-extra";

const handleImage = (json) => {
  return {
    ...json,
    palettes: JSON.stringify(json.palettes),
    folders: {
      connect: json.folders.map((folder) => ({
        id: folder,
      })),
    },
    tags: {
      connect: json.tags.map((tag) => ({
        id: tag,
      })),
    },
  };
};

const _path = join(process.env.LIBRARY, "./images/**/metadata.json");

export const initImage = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      const json = readJSONSync(file);
      const result = handleImage(json);

      prisma.image
        .upsert({
          where: {
            id: json.id,
          },
          update: result,
          create: result,
        })
        .then((image) => {
          console.log("init image with id: ", image.id);
        });
    })
    .on("change", (file) => {
      const json = readJSONSync(file);
      prisma.image
        .findFirst({
          where: {
            id: json.id,
          },
          include: {
            tags: true,
            folders: true,
          },
        })
        .then((old) => {
          prisma.image
            .update({
              where: {
                id: old.id,
              },
              data: {
                ...json,
                palettes: JSON.stringify(json.palettes),
                tags: {
                  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connectorcreate
                  connectOrCreate: json.tags.map((tag) => ({
                    where: { id: tag },
                    create: { id: tag, name: tag },
                  })),
                },
                folders: {
                  set: json.folders.map((folder) => ({ id: folder })),
                },
              },
            })
            .then((image) => {
              console.log("update image with id: ", image.id);
            });
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
