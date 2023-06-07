import * as fs from "fs";
import chroma from "chroma-js";

import { prisma, type Library, type Prisma } from "@acme/db";

import { type EagleEmit } from ".";
import { SUPPORT_EXT, type Metadata } from "./types";

export const handleImage = async (images: string[], library: Library, emit?: EagleEmit) => {
  for (const [index, image] of images.entries()) {
    // 特殊处理, metadata.json 可能是一个错误的json
    // eagle 本身的问题
    try {
      const metadata = JSON.parse(fs.readFileSync(image, "utf-8")) as Metadata;
      await transformImage(metadata, library);
      emit?.({
        type: "image",
        current: index + 1,
        count: images.length,
      });
    } catch (e) {
      emit?.({
        type: "image",
        current: index + 1,
        count: images.length,
      });
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
};

export const transformImage = async (metadata: Metadata, library: Library) => {
  if (!SUPPORT_EXT.includes(metadata.ext)) return null;
  if (metadata.isDeleted) return null;

  const imageInput: Prisma.ImageCreateInput = {
    id: metadata.id,
    name: metadata.name,
    size: metadata.size,
    ext: metadata.ext,
    width: metadata.width,
    height: metadata.height,
    noThumbnail: metadata.noThumbnail,
    duration: metadata.duration,
    tags: {
      connectOrCreate: metadata.tags?.map((tag) => ({
        where: { name: tag },
        create: { name: tag, library: { connect: { id: library.id } } },
      })),
    },
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
