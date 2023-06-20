import * as fs from "fs";
import chroma from "chroma-js";

import { Curd } from "@acme/curd";
import { prisma, type Library, type Prisma } from "@acme/db";

import { type EagleEmit } from ".";
import { SUPPORT_EXT, type Metadata } from "./types";

interface Props {
  images: string[];
  library: Library;
  emit?: EagleEmit;
  onError?: (err: unknown) => void;
}

export const handleImage = async ({ images, library, emit, onError }: Props) => {
  let failCount = 0;
  for (const [index, image] of images.entries()) {
    // 特殊处理, metadata.json 可能是一个错误的json
    // eagle 本身的问题
    try {
      const metadata = JSON.parse(fs.readFileSync(image, "utf-8")) as Metadata;
      const res = await transformImage(metadata, library);
      if (!res) failCount++;

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

  // 清除已经删除，sqlite中还存在的图片。
  await prisma.image.deleteMany({
    where: {
      AND: [
        {
          id: {
            notIn: images.map((image) => {
              const info = image.match(/(\d|[a-zA-Z])+\.info/g);
              return info?.[0].replace(".info", "") || "";
            }),
          },
        },
        { libraryId: library.id },
      ],
    },
  });

  // 清除 image 为 0 的 tag
  await Curd(prisma).tag().cleanByImageZero({ libraryId: library.id });
};

/**
 * 更新 Tags, disconnect 不存在的
 */
const updateTags = async (metadata: Metadata, library: Library) => {
  if (!metadata.tags) return undefined;

  // Fetch existing tags for the library

  const existingTags = await Curd(prisma).tag().get({ library: library.id });

  // Create a set of tag names from metadata.tags
  const metadataTagNames = new Set(metadata.tags);

  // disconnect tags that are not in metadata.tags
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

  const connectOrCreate = await updateTags(metadata, library);

  const imageInput: Prisma.ImageCreateInput = {
    id: metadata.id,
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
    lastTime: new Date(metadata.mtime),
    folders: { connect: metadata.folders?.map((id) => ({ id })) },
  };

  return prisma.image.upsert({
    where: { id: metadata.id },
    update: imageInput,
    create: imageInput,
  });
};
