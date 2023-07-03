import { join } from "path";
import * as fs from "fs-extra";

import { CONSTANT, type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { type Metadata } from "../types";

/**
 * Create image
 * @param path metadata.json path
 */
export const createImage = async (path: string, library: Library) => {
  try {
    const base = getImageBase(path);
    const args = transformImageArgs(base, library);

    if (!args) return null;

    return await curd.image.create(args);
  } catch (e) {
    throw e;
  }
};

/**
 * Update image
 * @param path metadata.json path
 */
export const updateImage = async (path: string, library: Library) => {
  try {
    const base = getImageBase(path);
    if (!base) return null;

    const args = transformImageArgs(base, library);

    if (!args) return null;

    const image = await curd.image.get({
      path: base.imagePath,
    });

    if (image && image[0]) {
      return await curd.image.update({
        id: image[0].id,
        ...args,
      });
    }

    return;
  } catch (e) {
    throw e;
  }
};

/**
 * Color rgb to hex
 * @param rgb
 * @returns
 */
const rgbToHex = (rgb: number[]) => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const [r, g, b] = rgb;
  if (!r || !g || !b) return;

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

const getImageBase = (path: string) => {
  try {
    const metadata = fs.readJSONSync(path) as Metadata;
    const stats = fs.statSync(path);
    const imagePath = join("images", `${metadata.id}.info`, `${metadata.name}.${metadata.ext}`);
    const thumbnailPath = metadata.noThumbnail ? imagePath : join("images", `${metadata.id}.info`, `${metadata.name}thumbnail.png`);
    const ext = metadata.ext as Constant["ext"];

    if (!CONSTANT["EXT"].includes(ext)) {
      return null;
    }

    return {
      metadata,
      stats,
      imagePath,
      thumbnailPath,
      ext,
    };
  } catch (e) {
    throw e;
  }
};

/**
 * Transform Image Args
 * @param path metadata.json path
 * @param library
 * @returns Image | undefined, undefined means the image is not supported
 */
const transformImageArgs = (base: ReturnType<typeof getImageBase>, library: Library) => {
  try {
    if (!base) return null;
    const { metadata, stats, imagePath, thumbnailPath, ext } = base;

    return {
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
    };
  } catch (e) {
    throw e;
  }
};
