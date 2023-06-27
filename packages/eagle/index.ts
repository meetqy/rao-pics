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
