import { readJsonSync, statSync } from "fs-extra";

import { EXT } from "@rao-pics/constant";
import type { Pending } from "@rao-pics/db";

import { router, routerCore } from "../..";
import { rgbToNumberMutilple100 } from "../color";
import { imageCore } from "../image";
import { diffColor } from "./color";
import { diffFolder } from "./folder";
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

  const oldImage = await imageCore.findUnique({
    path: p.path,
    includes: ["tags", "colors", "folders"],
  });

  const tags = await syncTag(
    newImage.tags,
    oldImage?.tags.map((item) => item.name),
  );

  const newColors = newImage.palettes
    .map((item) => rgbToNumberMutilple100(item.color))
    .filter(Boolean);
  const oldColors = oldImage?.colors.map((item) => item.rgb) ?? [];
  const colors = await diffColor(newColors, oldColors);

  const oldFolderIds = oldImage?.folders.map((item) => item.id);
  const folders = diffFolder(newImage.folders, oldFolderIds);

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
    // 从 A 文件夹 移动素材到 B, 需要取消 A 文件夹的关联，添加 B 文件夹的关联
    folders,
    tags,
    colors,
  });

  await caller.tag.deleteWithNotConnectImage();
  await caller.color.deleteWithNotConnectImage();

  return image;
};
