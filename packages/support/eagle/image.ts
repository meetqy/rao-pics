import * as fs from "fs";
import { sep } from "path";
import chroma from "chroma-js";

import { prisma, type Image, type Library, type Prisma, type Tag } from "@acme/db";

import { type EagleEmit } from ".";
import { SUPPORT_EXT, type Metadata } from "./types";

interface Props {
  images: string[];
  library: Library;
  emit?: EagleEmit;
  onError?: (err: unknown) => void;
}

const getIdByPath = (path: string) => {
  const arr = path.split(sep);
  arr.pop();
  const id = arr.pop()?.replace(".info", "");
  return id;
};

export const handleImage = async ({ images, library, emit, onError }: Props) => {
  let failCount = 0;
  const successImages: string[] = [];
  for (const [index, image] of images.entries()) {
    // 特殊处理, metadata.json 可能是一个错误的json
    // eagle 本身的问题
    try {
      const oldImage = await prisma.image.findFirst({
        where: { id: getIdByPath(image) },
        include: { tags: true },
      });

      const mTime = new Date(fs.statSync(image).mtime).getTime();

      // 如果图片存在，且修改时间在 3 秒内，跳过
      if (oldImage) {
        if (Math.abs(oldImage.lastTime.getTime() - mTime) < 30 * 1000) {
          successImages.push(oldImage.id);
          emit?.({
            type: "image",
            current: index + 1,
            count: images.length,
            failCount: failCount,
          });
          continue;
        }
      }

      const metadata = JSON.parse(fs.readFileSync(image, "utf-8")) as Metadata;
      metadata.mtime = mTime;
      const res = await transformImage(metadata, library);
      if (res) {
        successImages.push(res.id);
      } else {
        failCount++;
      }

      emit?.({
        type: "image",
        current: index + 1,
        count: images.length,
        failCount: failCount,
      });
    } catch (e) {
      failCount++;
      emit?.({
        type: "image",
        current: index + 1,
        count: images.length,
        failCount,
      });
      onError?.((e as Error)["message"] + "\n file path: " + image);
      continue;
    }
  }

  const oldImages = await prisma.image.findMany({
    where: { libraryId: library.id },
    select: { id: true },
  });

  function difference<T>(setA: Set<T>, setB: Set<T>) {
    const _difference = new Set(setA);
    for (const elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  // 对比 oldImageIdsSet 和 successImages，找出本次删除的 image
  const deleteImages = Array.from(difference(new Set(oldImages.map((v) => v.id)), new Set(successImages)));

  await prisma.image.deleteMany({
    where: { id: { in: deleteImages }, libraryId: library.id },
  });
};

/**
 * 更新 Tags, disconnect 不存在的
 */
const updateTags = async (
  metadata: Metadata,
  oldImage:
    | (Image & {
        tags: Tag[];
      })
    | null,
  library: Library,
) => {
  if (!metadata.tags || metadata.tags.length < 1) return;

  // 图片中存在的 tags.
  // qs: [a,b,c]
  const existingTags = oldImage?.tags || [];

  // 现图片中的 tags.
  // qs: [a,b,d]
  const metadataTagNames = new Set(metadata.tags);

  //  对比 metadata.tags，找出本次移除的 tag
  //  通过 update disconnect 取消关联
  for (const tag of existingTags) {
    if (!metadataTagNames.has(tag.name)) {
      await prisma.image.update({
        where: { id: metadata.id },
        data: { tags: { disconnect: { name: tag.name } } },
      });
    }
  }

  // Create or connect tags in metadata.tags
  const connectOrCreate: Prisma.Enumerable<Prisma.TagCreateOrConnectWithoutImagesInput> = metadata.tags.map((tag) => ({
    where: { name: tag },
    create: { name: tag, library: { connect: { id: library.id } } },
  }));

  return connectOrCreate;
};

export const transformImage = async (metadata: Metadata, library: Library) => {
  if (!SUPPORT_EXT.includes(metadata.ext)) return null;
  if (metadata.isDeleted) return null;

  const oldImage = await prisma.image.findFirst({
    where: { id: metadata.id },
    include: { tags: true },
  });

  const connectOrCreate = await updateTags(metadata, oldImage, library);

  const imageInput: Prisma.ImageCreateInput = {
    extendId: metadata.id,
    name: metadata.name,
    size: metadata.size,
    ext: metadata.ext,
    width: metadata.width,
    height: metadata.height,
    noThumbnail: metadata.noThumbnail,
    duration: metadata.duration,
    tags: { connectOrCreate },
    colors: {
      connectOrCreate: metadata.palettes.map(({ color, ratio }) => {
        const rgb = chroma(`rgb(${color.join(",")})`).num();

        return {
          where: { rgb },
          create: { rgb, ratio },
        };
      }),
    },
    library: { connect: { id: library.id } },
    createTime: new Date(metadata.modificationTime),
    lastTime: new Date(),
    folders: { connect: metadata.folders?.map((id) => ({ id })) },
  };

  return prisma.image.upsert({
    where: { id: metadata.id },
    update: imageInput,
    create: imageInput,
  });
};
