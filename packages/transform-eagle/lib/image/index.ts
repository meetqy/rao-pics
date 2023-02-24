import * as chokidar from "chokidar";
import { join } from "path";
import * as _ from "lodash";
import { readJsonSync, statSync } from "fs-extra";
import { getPrisma } from "../prisma";
import { logger } from "@eagleuse/utils";
import ProgressBar from "progress";
import { Image, Prisma, Tag } from "@prisma/client";
import TagPrisma from "../tag";
import { getNSFWMetadata } from "./nsfw";

// 防抖 需要延迟的毫秒数
const _wait = 3000;

let bar;

interface FileItem {
  file: string;
  type: "update" | "delete";
}

// 本次 handleImage 是否有disconnect的标签、文件夹
const isDisconnect = {
  tag: false,
};

// 待处理图片
const PendingFiles: {
  readonly value: Set<FileItem>;
  add: (fileItem: FileItem) => void;
  delete: (fileItem: FileItem) => void;
} = {
  value: new Set(),

  add: (fileItem) => {
    PendingFiles.value.add(fileItem);
    _debounce();
  },

  delete: (fileItem) => {
    PendingFiles.value.delete(fileItem);

    bar.tick();

    // 本轮 value 清空
    if (bar.complete) {
      bar = null;

      if (isDisconnect.tag) {
        isDisconnect.tag = false;
        TagPrisma.clearImageZero();
      }

      logger.info("Image Complete 🚀");
    }
  },
};

function getPrismaParams(
  data: EagleUse.Image,
  oldData: Image & {
    tags: Tag[];
  }
): Prisma.ImageCreateInput {
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

    // 标签 从 a => b
    // 1.需要 disconnect a
    // 2.如果 a 标签所关联的图片数量小于1 需要删除
    if (oldData && oldData.tags) {
      const disconnectTags = _.difference(
        oldData.tags.map((tag) => tag.id),
        data.tags as string[]
      );

      if (disconnectTags.length > 0) {
        tags["disconnect"] = disconnectTags.map((tag) => ({ id: tag }));
        isDisconnect.tag = true;
      }
    }
  }

  return {
    ...data,
    tags,
    folders,
    palettes: JSON.stringify(data.palettes),
  };
}

const handleImage = async () => {
  const prisma = getPrisma();
  if (PendingFiles.value.size < 1) return;

  if (!bar) {
    bar = new ProgressBar("🐰 Image: [:bar] :current/:total", {
      total: PendingFiles.value.size,
      width: 50,
      complete: "#",
    });
  }

  for (const fileItem of PendingFiles.value) {
    const { file, type } = fileItem;
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

    // 删除
    if (type === "delete") {
      prisma.image
        .delete({
          where: { id },
        })
        .then(() => PendingFiles.delete(fileItem));

      return;
    }

    const image = await prisma.image.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    let metadata: EagleUse.Image = readJsonSync(file);

    // nsfw检测
    if (!image.nsfw) metadata = await getNSFWMetadata(metadata, file);

    const data = getPrismaParams({ ...metadata, metadataMTime: mtime }, image);

    // 新增
    if (!image) {
      // 使用upsert
      // 针对: 添加的图片，已经存在当前library中，
      // Eagle 会弹窗提示是否使用已存在的场景
      prisma.image
        .upsert({
          where: { id },
          create: data,
          update: data,
        })
        .then(() => PendingFiles.delete(fileItem))
        .catch((e) => {
          console.log(data.id, e);
        });
      return;
    }

    // 更新
    if (Math.floor(mtime / 1000) - Math.floor(Number(image.metadataMTime) / 1000) > 2) {
      prisma.image
        .update({
          where: {
            id: data.id,
          },
          data,
        })
        .then(() => PendingFiles.delete(fileItem));
    } else {
      PendingFiles.delete(fileItem);
    }
  }
};

const _debounce = _.debounce(handleImage, _wait);

const watchImage = (library: string) => {
  const _path = join(library, "./images/**/metadata.json");

  chokidar
    .watch(_path)
    .on("add", (file) => PendingFiles.add({ file, type: "update" }))
    .on("change", (file) => PendingFiles.add({ file, type: "update" }))
    .on("unlink", (file) => PendingFiles.add({ file, type: "delete" }));
};

export default watchImage;
