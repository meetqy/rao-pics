import * as chokidar from "chokidar";
import { join } from "path";
import * as _ from "lodash";
import { readJsonSync, statSync } from "fs-extra";
import { getPrisma } from "@raopics/prisma-client";
import { logger } from "@raopics/utils";
import ProgressBar from "progress";
import TagPrisma from "../tag";
import { getNSFWMetadata } from "./nsfw";
import { trigger } from "../trigger";
import getPrismaParams from "./getPrismaParams";

// 防抖 需要延迟的毫秒数
const _wait = 3000;

let bar;
const supportExt = ["jpg", "png", "webp", "jpeg", "bmp", "gif", "mp4"];
const supportNSFWExt = ["jpg", "png", "webp", "jpeg", "bmp"];

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
  readonly temp: Set<string>;
  readonly value: Set<FileItem>;
  add: (fileItem: FileItem) => void;
  delete: (fileItem: FileItem) => void;
} = {
  temp: new Set(),
  value: new Set(),

  add: (fileItem) => {
    PendingFiles.temp.add(fileItem.file);
    trigger();

    if (PendingFiles.temp.size > PendingFiles.value.size) {
      PendingFiles.value.add(fileItem);
      _debounce();
    }
  },

  delete: (fileItem) => {
    PendingFiles.value.delete(fileItem);
    trigger();

    if (bar) {
      bar.tick();

      // 本轮 value 清空
      if (bar.complete) {
        bar = null;
        PendingFiles.temp.clear();
        PendingFiles.value.clear();

        if (isDisconnect.tag) {
          isDisconnect.tag = false;
          TagPrisma.clearImageZero();
        }

        logger.info("Image Complete 🚀");
      }
    }
  },
};

const handleImage = async () => {
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
      getPrisma()
        .image.delete({
          where: { id },
        })
        .catch(() => {
          // 捕获替换操作异常
          // 兼容：使用已存在的图片
          // meta: { cause: 'Record to delete does not exist.' }
        })
        .finally(() => PendingFiles.delete(fileItem));
      continue;
    }

    const mtime = Math.floor(mtimeMs);

    // 删除
    if (type === "delete") {
      getPrisma()
        .image.delete({
          where: { id },
        })
        .catch()
        .then(() => PendingFiles.delete(fileItem));
      continue;
    }

    let metadata: EagleUse.Image = readJsonSync(file);

    // 不支持的扩展名 直接删除并跳过后续执行
    if (!supportExt.includes(metadata.ext.toLocaleLowerCase())) {
      PendingFiles.delete(fileItem);
      continue;
    }

    const image = await getPrisma().image.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    let [data, disconnect] = getPrismaParams({ ...metadata, metadataMTime: mtime }, image);
    isDisconnect.tag = disconnect;

    // 新增
    if (!image) {
      // nsfw检测
      if (!image || !image.nsfw) {
        // 不支持的扩展名 直接删除并跳过后续执行
        if (supportNSFWExt.includes(metadata.ext.toLocaleLowerCase())) {
          metadata = await getNSFWMetadata(metadata, file);
        }

        [data, disconnect] = getPrismaParams({ ...metadata, metadataMTime: mtime }, image);
        isDisconnect.tag = disconnect;
      }

      // 使用upsert
      // 针对: 添加的图片，已经存在当前library中，
      // Eagle 会弹窗提示是否使用已存在的场景
      getPrisma()
        .image.upsert({
          where: { id },
          create: data,
          update: data,
        })
        .catch((e) => logger.error(e, `Image upsert error(${id}): `))
        .finally(() => PendingFiles.delete(fileItem));
      continue;
    }

    // 更新
    if (
      !image.metadataMTime ||
      Math.floor(mtime / 1000) - Math.floor(Number(image.metadataMTime) / 1000) > 2
    ) {
      getPrisma()
        .image.update({
          where: { id: data.id },
          data,
        })
        .finally(() => PendingFiles.delete(fileItem));
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
