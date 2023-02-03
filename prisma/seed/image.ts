import { join } from "path";
import { PrismaClient } from "@prisma/client";
import chokidar from "chokidar";
import { readJSONSync } from "fs-extra";
import logger from "@/utils/logger";
import { readdirSync } from "fs";
import _ from "lodash";

const handleImage = (json) => {
  return {
    ...json,
    palettes: JSON.stringify(json.palettes),
    folders: {
      connect: json.folders.map((folder) => ({ id: folder })),
    },
    tags: {
      connectOrCreate: json.tags.map((tag) => ({
        where: { id: tag },
        create: { id: tag, name: tag },
      })),
    },
  };
};

const _path = join(process.env.LIBRARY, "./images/**/metadata.json");

const getMetadata = (file): { metadata: EagleUse.Image; support: boolean } => {
  let json;
  // 使用 try catch 替代 setTimeout 延时
  try {
    json = readJSONSync(file);
  } catch (e) {
    json = readJSONSync(file);
  }

  return {
    metadata: json,
    support: ["jpg", "png", "jpeg", "webp"].includes(
      json.ext.toLocaleLowerCase()
    ),
  };
};

export const initImage = (prisma: PrismaClient) => {
  const allCount = readdirSync(join(process.env.LIBRARY, "./images")).filter(
    (file) => file.endsWith(".info")
  ).length;

  let excludeCount = 0;

  // index > 0 表示初始化
  let index = allCount;

  const addImages: string[] = [];

  chokidar
    .watch(_path)
    .on("add", (file) => {
      const { metadata, support } = getMetadata(file);
      if (!support) {
        logger.warn(`not support ext(${metadata.ext}): ${file}`);
        excludeCount++;
        return;
      }

      const result = handleImage(metadata);

      prisma.image
        .findUnique({
          where: { id: result.id },
        })
        .then((image) => {
          index--;

          if (!image) {
            // 初始化
            if (index > -1) {
              prisma.image
                .create({
                  data: result,
                })
                .catch((e) => {
                  logger.error(e, `add image(${result.id}) error: `);
                });

              return;
            }

            return addImages.push(result.id);
          }

          prisma.image
            .update({
              where: { id: result.id },
              data: result,
            })
            .catch((e) => {
              logger.error(e, "add => update image error: ");
            });
        });
    })
    .on("change", (file) => {
      const { metadata, support } = getMetadata(file);
      if (!support) {
        return logger.warn(
          `not support ext: ${metadata.ext}, id: ${metadata.id}, name: ${metadata.name}`
        );
      }

      const result = handleImage(metadata);

      // 创建
      if (addImages.includes(result.id)) {
        prisma.image
          .create({
            data: result,
          })
          .then((image) => {
            logger.info("change => create image with id: " + image.id);
            _.remove(addImages, (n) => n === image.id);
          })
          .catch((e) => {
            logger.error(e, `change => create image(${result.id}) error: `);
          });
      } else {
        prisma.image
          .update({
            where: { id: result.id },
            data: result,
          })
          .then((image) => {
            logger.info("change => update image with id: " + image.id);
          })
          .catch((e) => {
            logger.error(e, `change => update image(${result.id}) error: `);
          });
      }
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
          logger.info(`delete image with id: ${image.id}`);
        })
        .catch((e) => {
          logger.error(e, `delete image error(${id}): `);
        });
    })
    .on("ready", () => {
      logger.info(
        `init image counts: ${allCount}, exculde counts: ${excludeCount}`
      );
    });
};
