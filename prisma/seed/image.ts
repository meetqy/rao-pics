import { join } from "path";
import { PrismaClient } from "@prisma/client";
import chokidar from "chokidar";
import { readJSONSync } from "fs-extra";

const handleImage = (json) => {
  return {
    ...json,
    palettes: JSON.stringify(json.palettes),
    folders: JSON.stringify(json.folders),
    tags: {
      create: json.tags.map((tag) => {
        return {
          imageId: json.id,
          tagId: tag,
        };
      }),
    },
  };
};

const _path = join(process.env.LIBRARY, "./images/**/metadata.json");

export const initImage = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      const json = readJSONSync(file);

      const result = {
        ...json,
        palettes: JSON.stringify(json.palettes),
        folders: JSON.stringify(json.folders),
        tags: {
          connectOrCreate: json.tags.map((tag) => ({
            where: {
              id: tag,
            },
            create: { id: tag, name: tag },
          })),
        },
      };

      prisma.image
        .upsert({
          where: {
            id: json.id,
          },
          update: result,
          create: result,
        })
        .then((image) => {
          // console.log("init image with id: ", image.id);
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
