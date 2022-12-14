import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { join } from "path";
import chokidar from "chokidar";
import { readJSONSync } from "fs-extra";

const prisma = new PrismaClient();

dotenv.config({ path: join(__dirname, "../.env") });

const { LIBRARY } = process.env;

const _path = {
  library: LIBRARY,
  images: join(LIBRARY, "./images/**/*.json"),
};

const handleImage = (json) => {
  return {
    ...json,
    palettes: JSON.stringify(json.palettes),
    folders: JSON.stringify(json.folders),
    tags: JSON.stringify(json.tags),
  };
};

chokidar
  .watch(_path.images)
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
