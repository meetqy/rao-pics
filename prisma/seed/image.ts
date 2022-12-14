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
      (async () => {
        const json = readJSONSync(file);
        const getImage = await prisma.image.findUnique({
          where: {
            id: json.id,
          },
        });
        if (!getImage) {
          const image = await prisma.image.create({
            data: handleImage(json),
          });

          console.log("create image with id: ", image.id);
        }
      })();
    })
    .on("change", (file) => {
      (async () => {
        const json = readJSONSync(file);
        const image = await prisma.image.update({
          where: {
            id: json.id,
          },
          data: handleImage(json),
        });

        console.log("update image with id: ", image.id);
      })();
    })
    .on("unlink", async (file) => {
      const id = file
        .match(/\/(\d|[a-zA-Z])+.info/)[0]
        .split(".")[0]
        .replace("/", "");
      const image = await prisma.image.delete({
        where: {
          id,
        },
      });

      console.log("delete image with id: ", image.id);
    });
};
