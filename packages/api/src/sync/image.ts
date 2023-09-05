import { readJsonSync, statSync } from "fs-extra";

import { EXT } from "@rao-pics/constant";
import type { Pending } from "@rao-pics/db";

import { router } from "../..";
import { rgbTo16BitHex } from "../color";
import { syncColor } from "./color";
import { syncTag } from "./tag";

/**
 * 检测图片是否需要更新
 * @param path
 */
export const checkedImage = async (path: string) => {
  const { mtime } = statSync(path);

  const caller = router.createCaller({});
  const image = await caller.image.findUnique({
    path,
  });

  if (image) {
    // 对比时间，如果小于3秒，不更新
    if (mtime.getTime() - image.mtime.getTime() < 3000) {
      return;
    }
  }

  let data;
  try {
    data = readJsonSync(path) as Metadata;
  } catch (e) {
    throw new Error("[json-error] read json error");
  }

  if (data.isDeleted) {
    throw new Error("[deleted] image is deleted");
  }

  if (!EXT.includes(data.ext)) {
    throw new Error("[unsupported-ext] not support file type");
  }

  return {
    ...data,
    mtime,
  };
};

export const createImage = async (p: Pending) => {
  const caller = router.createCaller({});

  const newImage = await checkedImage(p.path);

  if (!newImage) return;

  const oldImage = await caller.image.findUnique({
    path: p.path,
    includes: ["tags", "colors"],
  });

  const tags = await syncTag(
    newImage.tags,
    oldImage?.tags.map((item) => item.name),
  );

  const newColors = newImage.palettes
    .map((item) => rgbTo16BitHex(item.color))
    .filter(Boolean) as number[];
  const oldColors = oldImage?.colors.map((item) => item.rgb) ?? [];

  const colors = await syncColor(newColors, oldColors);

  const image = await caller.image.upsert({
    path: p.path,
    name: newImage.name,
    ext: newImage.ext,
    size: newImage.size,
    width: newImage.width,
    height: newImage.height,
    mtime: newImage.mtime,
    // 文件件只需要关联，删除处理在 handleFolder 中处理，删除 folder 会同时删除关联的 image
    folders: { connect: newImage.folders },
    tags,
    colors,
  });

  await caller.tag.deleteWithNotConnectImage();
  await caller.color.deleteWithNotConnectImage();

  return image;
};
