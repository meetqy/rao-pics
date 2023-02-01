import { readJSONSync } from "fs-extra";
import chokidar from "chokidar";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import logger from "@/utils/logger";

const _path = join(process.env.LIBRARY, "./tags.json");

const handleTags = (file, prisma, type) => {
  const json = readJSONSync(file);
  const { historyTags, starredTags } = json;

  historyTags.map((item) => {
    const tag = {
      id: item,
      name: item,
      starred: starredTags.includes(item),
    };

    prisma.tag
      .upsert({
        where: {
          id: tag.id,
        },
        create: tag,
        update: tag,
      })
      .then((tag) => {
        if (type != "init") {
          logger.info(tag.id, `${type} tag with id: `);
        }
      });
  });
};

export const initTag = (prisma: PrismaClient) => {
  chokidar
    .watch(_path)
    .on("add", (file) => {
      handleTags(file, prisma, "init");
    })
    .on("change", (file) => {
      handleTags(file, prisma, "update");
    });
};
