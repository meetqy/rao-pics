import * as fs from "fs";

import { prisma, type Library, type Prisma } from "@acme/db";

import { type EagleEmit } from ".";
import { SUPPORT_EXT, type Metadata } from "./types";

export const handleImage = async (images: string[], library: Library, emit?: EagleEmit) => {
  for (const [index, image] of images.entries()) {
    const metadata = JSON.parse(fs.readFileSync(image, "utf-8")) as Metadata;
    await transformImage(metadata, library);

    emit &&
      emit({
        type: "image",
        current: index + 1,
        count: images.length,
      });
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
    tags: JSON.stringify(metadata.tags),
    colors: {
      connectOrCreate: handleColors(metadata).map((color) => ({
        where: { color },
        create: { color },
      })),
    },
    library: { connect: { id: library.id } },
    createTime: new Date(metadata.modificationTime),
    lastTime: new Date(metadata.mtime),
    folders: { connect: metadata.folders?.map((id) => ({ id })) },
  };

  const res = await prisma.image.upsert({
    where: { id: metadata.id },
    update: imageInput,
    create: imageInput,
  });

  return res;
};

const handleColors = (metadata: Metadata) => {
  return metadata.palettes.map((palette) => `${palette.color.join(",")},${palette.ratio}`);
};
