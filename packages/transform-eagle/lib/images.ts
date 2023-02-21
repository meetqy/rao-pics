import * as chokidar from "chokidar";
import { join } from "path";
import * as _ from "lodash";
import { readJsonSync, statSync } from "fs-extra";
import { getPrisma } from "./prisma";

// 待处理的图片
const pendingFiles: Set<{
  file: string;
  type: "update" | "delete";
}> = new Set();

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
    const { mtimeMs } = statSync(file);
    const mtime = Math.floor(mtimeMs);
    const id = file
      .split("/")
      .filter((item) => item.includes(".info"))[0]
      .replace(/\.info/, "");

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
          prisma.image
            .create({
              data,
            })
            .then(complete);
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

const _throttle = _.throttle(handleImage, 5000);

const watchImage = (library: string) => {
  const _path = join(library, "./images/**/metadata.json");

  chokidar.watch(_path).on("all", (type, file) => {
    if (["add", "change", "unlink"].includes(type)) {
      type === "unlink"
        ? pendingFiles.delete({
            file,
            type: "delete",
          })
        : pendingFiles.add({
            file,
            type: "update",
          });
      _throttle();
    }
  });
};

export default watchImage;
