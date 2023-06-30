import { join } from "path";
import chokidar from "chokidar";
import * as fs from "fs-extra";
import { debounce } from "lodash";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { handleFolder } from "./src/folder";
import { createImage } from "./src/image";
import { type EmitOption, type LibraryMetadata } from "./types";

interface Props {
  library: Library;
  emit?: (option: EmitOption) => void;
  onError?: (err: unknown) => void;
}

/**
 * 是否第一次监听，第一次监听无需记录，直接添加
 */
export const isFirst = async (library: Library) => {
  const libs = await curd.library.get({ library: library.id });
  const lib = libs && libs[0];
  if (lib && lib._count.images > 0) {
    return false;
  }

  return true;
};

let watcher: chokidar.FSWatcher;

/** 等待处理的文件 */
const pendingPath: Set<string> = new Set();

const option: EmitOption = {
  type: "image",
  failCount: 0,
  count: 0,
  current: 0,
};

export const start = async (props: Props) => {
  const { library, onError, emit } = props;
  try {
    // handle folder
    const base = fs.readJSONSync(join(library.dir, "metadata.json")) as LibraryMetadata;
    await handleFolder(base.folders, library, emit);

    if (watcher) return;

    watcher = chokidar.watch(join(library.dir, "images", "**", "metadata.json"));

    watcher.on("add", (path: string) => {
      pendingPath.add(path);

      void handlePendingPath(props);
    });
  } catch (e) {
    onError?.(e);
  }
};

const handlePendingPath = debounce(async (props: Props) => {
  const { library, emit, onError } = props;
  try {
    option.count = pendingPath.size;
    for (const path of pendingPath) {
      const res = await createImage(path, library);
      option.current++;

      if (!res) {
        option.failCount++;
      }

      emit?.(option);
    }

    // // Completed init option
    // pendingPath.clear();
    // option.count = 0;
    // option.current = 0;
    // option.failCount = 0;
  } catch (e) {
    onError?.(e);
  }
}, 1000);
