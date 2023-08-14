import { join } from "path";
import * as Sentry from "@sentry/electron";
import * as fs from "fs-extra";

import { CONSTANT, type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { type Library } from "@acme/db";
import { rgbToHex } from "@acme/util";

import { type Metadata } from "../types";

/**
 * Create image
 * @param path metadata.json path
 */
export const createImage = async (path: string, library: Library) => {
  const base = await getImageBase(path, library.id);
  const args = transformImageArgs(base, library);

  if (!args) return null;
  if (args.isDeleted) {
    void curd.fail.upsert({
      libraryId: library.id,
      path,
      type: "trash",
    });

    return null;
  }

  return await curd.image.create(args);
};

/**
 * Update image
 * @param path metadata.json path
 */
export const updateImage = async (path: string, library: Library) => {
  const base = await getImageBase(path, library.id);
  if (!base) return null;

  const newImage = transformImageArgs(base, library);

  if (!newImage) return null;
  if (newImage.isDeleted) {
    void curd.fail.upsert({
      libraryId: library.id,
      path,
      type: "trash",
    });

    return await curd.image.delete({
      path: base.imagePath,
    });
  }

  const oldImages = await curd.image.get({
    path: base.imagePath,
    libraryId: library.id,
  });

  const oldImage = oldImages[0];

  if (oldImage) {
    // update and create tags
    if (newImage.tags && newImage.tags.length > 0) {
      for (const tag of newImage.tags) {
        await curd.tag.upsert({
          libraryId: library.id,
          name: tag,
          imageIds: [oldImage.id],
        });
      }
    }

    // update and create color
    if (newImage.colors && newImage.colors.length > 0) {
      await Promise.all(
        newImage.colors.map(
          (hex) =>
            hex &&
            curd.color.upsert({
              imageId: oldImage.id,
              color: hex,
            }),
        ),
      );
    }

    return await curd.image.update({
      id: oldImage.id,
      ...newImage,
    });
  } else {
    // 从回收站恢复，image中是不存在该图片的，
    // 应该走添加逻辑
    const fails = await curd.fail.get({
      libraryId: library.id,
      path,
    });

    if (fails.length) {
      await curd.fail.delete({ path });
    }

    return await createImage(path, library);
  }
};

/**
 * image metadata base
 * @param path metadata.json path
 * @returns
 */
const getImageBase = async (path: string, libraryId: number) => {
  try {
    const metadata = fs.readJSONSync(path) as Metadata;
    const stats = fs.statSync(path);
    const imagePath = join("images", `${metadata.id}.info`, `${metadata.name}.${metadata.ext}`);
    const thumbnailPath = metadata.noThumbnail ? imagePath : join("images", `${metadata.id}.info`, `${metadata.name}_thumbnail.png`);
    const ext = metadata.ext as Constant["ext"];

    if (!CONSTANT["EXT"].includes(ext)) {
      await curd.fail.upsert({
        libraryId,
        path,
        type: "ext",
      });

      return null;
    }

    return {
      metadata,
      stats,
      imagePath,
      thumbnailPath,
      ext,
    };
  } catch (error) {
    console.error(error);
    await curd.fail.upsert({
      libraryId,
      path,
      type: "json-error",
    });

    Sentry.captureException(error);

    return null;
  }
};

/**
 * Transform Image Args
 * @param path metadata.json path
 * @param library
 * @returns Image | undefined, undefined means the image is not supported
 */
const transformImageArgs = (base: Awaited<ReturnType<typeof getImageBase>>, library: Library) => {
  if (!base) return null;
  const { metadata, stats, imagePath, thumbnailPath, ext } = base;

  return {
    isDeleted: metadata.isDeleted,
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
    folders: metadata.folders ? metadata.folders.map((folder) => ({ id: folder })) : undefined,
    tags: metadata.tags,
    // #000000
    colors: metadata.palettes
      ? (metadata.palettes
          .map((palette) => rgbToHex(palette.color))
          .filter((c) => !!c)
          .splice(0, 9) as string[])
      : undefined,
  };
};
