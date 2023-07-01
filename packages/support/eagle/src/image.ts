import { join } from "path";
import * as fs from "fs-extra";

import { CONSTANT, type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { type Library, type Pending } from "@acme/db";

import { type Metadata } from "../types";

const rgbToHex = (rgb: number[]) => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const [r, g, b] = rgb;
  if (!r || !g || !b) return;

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

/**
 * Create image
 * @param path metadata.json path
 * @param library
 * @returns Image | undefined, undefined means the image is not supported
 */
export const createImage = async (path: string, library: Library) => {
  try {
    const metadata = fs.readJSONSync(path) as Metadata;
    const stats = fs.statSync(path);
    const imagePath = join("images", `${metadata.id}.info`, `${metadata.name}.${metadata.ext}`);
    const thumbnailPath = metadata.noThumbnail ? imagePath : join("images", `${metadata.id}.info`, `${metadata.name}thumbnail.png`);
    const ext = metadata.ext as Constant["ext"];

    if (!CONSTANT["EXT"].includes(ext)) {
      return;
    }

    return await curd.image.create({
      libraryId: library.id,
      path: imagePath,
      thumbnailPath,
      name: metadata.name,
      size: metadata.size,
      createTime: stats.ctime,
      lastTime: stats.mtime,
      ext,
      width: metadata.width,
      height: metadata.height,
      duration: metadata.duration,
      folders: metadata.folders?.map((folder) => ({ id: folder })),
      tags: metadata.tags,
      colors: metadata.palettes?.map((palette) => rgbToHex(palette.color)).filter((c) => !!c) as string[],
    });
  } catch (e) {
    throw e;
  }
};
