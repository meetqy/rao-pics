import * as chokidar from "chokidar";
import { join } from "path";
import * as _ from "lodash";
import { readJsonSync, statSync } from "fs-extra";
import { getPrisma } from "./prisma";
import { logger } from "@eagleuse/utils";

// 防抖 需要延迟的毫秒数
const _wait = 5000;

// 待处理的图片
const pendingFiles: Set<{
  file: string;
  type: "update" | "delete";
}> = new Set();

const addPendingFiles = (file, type: "update" | "delete") => {
  pendingFiles.add({ file, type });
  _throttle();
};

const getPrismaParams = (data: EagleUse.Image) => {
  let tags = {},
    folders = {};

  if (data.folders) {
    folders = {
      connect: data.folders.map((folder) => ({ id: folder })),
    };
  }

  if (data.tags) {
    tags = {
      connectOrCreate: data.tags.map((tag) => ({
        where: { id: tag },
        create: { id: tag, name: tag },
      })),
    };
  }

  return {
    ...data,
    tags,
    folders,
    palettes: JSON.stringify(data.palettes),
  };
};

const handleImage = () => {
  const prisma = getPrisma();
  if (pendingFiles.size < 1) return;

  for (const { file, type } of pendingFiles) {
    const id = file
      .split("/")
      .filter((item) => item.includes(".info"))[0]
      .replace(/\.info/, "");

    let mtimeMs: number;
    try {
      mtimeMs = statSync(file).mtimeMs;
    } catch (e) {
      prisma.image.delete({
        where: {
          id,
        },
      });

      continue;
    }

    const mtime = Math.floor(mtimeMs);

    const complete = () => {
      pendingFiles.delete({ file, type });
    };

    // 删除
    if (type === "delete") {
      prisma.image
        .delete({
          where: { id },
        })
        .then(complete);

      return;
    }

    prisma.image
      .findUnique({
        where: {
          id,
        },
      })
      .then((image) => {
        const metadata: EagleUse.Image = readJsonSync(file);

        const data = getPrismaParams(metadata);

        // 新增
        if (!image) {
          // 使用upsert
          // 针对添加的图片，已经存在当前library中
          prisma.image
            .upsert({
              where: { id },
              create: data,
              update: data,
            })
            .then(complete)
            .catch((e) => {
              console.log(data.id, e);
            });
          return;
        }

        // 更新
        if (mtime > image.modificationTime) {
          prisma.image
            .update({
              where: {
                id: data.id,
              },
              data,
            })
            .then(complete);
        }
      });
  }
};

const _throttle = _.debounce(handleImage, _wait);

const watchImage = (library: string) => {
  logger.info("watching images");
  const _path = join(library, "./images/**/metadata.json");

  chokidar
    .watch(_path)
    .on("add", (file) => addPendingFiles(file, "update"))
    .on("change", (file) => addPendingFiles(file, "update"))
    .on("unlink", (file) => addPendingFiles(file, "delete"));
};

export default watchImage;
