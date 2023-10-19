import { readJsonSync, statSync } from "fs-extra";

import { EXT } from "@rao-pics/constant";
import type { Pending } from "@rao-pics/db";

import { router, routerCore } from "../..";
import { rgbToNumberMutilple100 } from "../color";
import { syncColor } from "./color";
import { syncTag } from "./tag";

/**
 * 检测图片是否需要更新
 * @param path
 */
export const checkedImage = async (path: string, timeout = 3000) => {
  const { mtime } = statSync(path);

  const image = await routerCore.image.findUnique({ path });

  // 对比时间，如果小于3秒，不更新
  if (image && mtime.getTime() - image.mtime.getTime() < timeout) {
    return;
  }

  let data;
  try {
    data = readJsonSync(path) as Metadata;
  } catch (e) {
    throw new Error("[json-error] read json error");
  }

  if (!EXT.includes(data.ext)) {
    throw new Error("[unsupported-ext] not support file type");
  }

  return {
    ...data,
    mtime,
  };
};

export const upsertImage = async (p: Pending, timeout = 3000) => {
  const caller = router.createCaller({});

  const newImage = await checkedImage(p.path, timeout);

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
    .map((item) => rgbToNumberMutilple100(item.color))
    .filter(Boolean);
  const oldColors = oldImage?.colors.map((item) => item.rgb) ?? [];

  const colors = await syncColor(newColors, oldColors);

  const image = await caller.image.upsert({
    id: oldImage?.id,
    path: p.path,
    name: newImage.name,
    ext: newImage.ext,
    size: newImage.size,
    width: newImage.width,
    height: newImage.height,
    mtime: newImage.mtime,
    annotation: newImage.annotation,
    url: newImage.url,
    isDeleted: newImage.isDeleted,
    duration: newImage.duration,
    noThumbnail: newImage.noThumbnail ?? false,
    // 添加时间
    modificationTime: new Date(newImage.modificationTime),
    // 文件夹只需要关联，删除处理在 handleFolder 中处理，删除 folder 会同时删除关联的 image
    folders: { connect: newImage.folders },
    tags,
    colors,
  });

  await caller.tag.deleteWithNotConnectImage();
  await caller.color.deleteWithNotConnectImage();

  return image;
};

export const deleteImage = async (p: Pending) => {
  const caller = router.createCaller({});

  await caller.image.deleteByUnique({
    path: p.path,
  });
};
