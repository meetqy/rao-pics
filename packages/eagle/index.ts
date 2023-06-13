import * as fs from "fs";
import { join } from "path";
import * as fg from "fast-glob";

import { type Library } from "@acme/db";

import { handleFolder } from "./folder";
import { handleImage } from "./image";
import { type LibraryMetadata } from "./types";

export type EagleEmitOption = { type: "folder" | "image"; current: number; count: number; failCount?: number };
export type EagleEmit = (option: EagleEmitOption) => void;

interface Props {
  library: Library;
  emit?: EagleEmit;
  onError?: (err: unknown) => void;
}

// XXX: 为什么不把添加 Eagle 所有的方法写到 @acme/api 中？
// trpc 无法直接返回同步进度，需要结合 websocked
// 而不走 trpc 的方式，可以通过回调方法，Eelectron 中可以直接得到当前同步的进度
export const start = async ({ library, emit, onError }: Props) => {
  try {
    const base = JSON.parse(fs.readFileSync(`${library.dir}/metadata.json`, "utf-8")) as LibraryMetadata;
    const images = fg.sync(join(library.dir, "images", "**", "metadata.json").replace(/\\/g, "/"));

    await handleFolder(base.folders, library, emit);

    await handleImage({ images, library, emit, onError });
  } catch (e) {
    onError?.(e);
  }
};
