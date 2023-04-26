import * as chokidar from "chokidar";
import { join } from "path";
import * as _ from "lodash";
import { readJsonSync, statSync } from "fs-extra";
import { getPrisma } from "@raopics/prisma-client";
import { logger } from "@raopics/utils";
import ProgressBar from "progress";
import TagPrisma from "../tag";
import { trigger } from "../trigger";
import getPrismaParams from "./getPrismaParams";
import { Metadata, Transform } from "../types";
import { WAIT_TIME } from "../constant";

interface FileItem {
  file: string;
  type: "update" | "delete";
}

let bar;
const supportExt = ["jpg", "png", "webp", "jpeg", "bmp", "gif", "mp4", "pdf"];

let _transform: Transform = {};

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

        logger.info("[transform-eagle] Image Complete 🚀");
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

    const metadata: Metadata = readJsonSync(file);

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

    const pluginBackMetadata = await _transform?.before({ metadata, database: image });

    const [data, disconnect] = getPrismaParams(
      {
        ...metadata,
        // transform.before 处理之后的数据
        ...pluginBackMetadata,
        metadataMTime: mtime,
      },
      image
    );
    isDisconnect.tag = disconnect;

    // 本地更新 sqlite
    // 依次更新，用户始终只有一个，所以无需判断是否需要更新
    // 本机中的metadata改变之后，直接同步到sqlite中
    getPrisma()
      .image.upsert({
        where: { id },
        create: data,
        update: data,
      })
      .catch((e) => logger.error(e, `Image upsert error(${id}): `))
      .finally(() => PendingFiles.delete(fileItem));
  }
};

const _debounce = _.debounce(handleImage, WAIT_TIME);

const watchImage = (library: string, transform?: Transform) => {
  const _path = join(library, "./images");

  _transform = transform;

  chokidar
    .watch(_path, {
      followSymlinks: false,
      awaitWriteFinish: true,
      ignored: /\*\.info$/,
    })
    .on("all", (e, file) => {
      if (file.endsWith(".json")) {
        switch (e) {
          case "add":
            return PendingFiles.add({ file, type: "update" });
          case "change":
            return PendingFiles.add({ file, type: "update" });
          case "unlink":
            return PendingFiles.add({ file, type: "delete" });
        }
      }
    });
};

export default watchImage;
