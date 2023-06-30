import { join } from "path";
import chokidar from "chokidar";
import * as fs from "fs-extra";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
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

export const start = async ({ library, emit, onError }: Props) => {
  try {
    // handle folder
    const base = fs.readJSONSync(join(library.dir, "metadata.json")) as LibraryMetadata;
    await handleFolder(base.folders, library, emit);

    const first = await isFirst(library);

    chokidar.watch(library.dir).on(join(library.dir, "images", "**", "metadata.json"), (path) => {
      if (first) {
      }
    });
  } catch (e) {
    onError?.(e);
  }

  // try {
  //   const base = JSON.parse(fs.readFileSync(`${library.dir}/metadata.json`, "utf-8")) as LibraryMetadata;
  //   const images = fg.sync(join(library.dir, "images", "**", "metadata.json").replace(/\\/g, "/"));
  //   await handleFolder(base.folders, library, emit);
  //   await handleImage({ images, library, emit, onError });
  // } catch (e) {
  //   onError?.(e);
  // }
};
