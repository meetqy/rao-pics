import fs from "fs-extra";

import { prisma, type Library, type Prisma } from "@acme/db";

import { SUPPORT_EXT, type Metadata } from "./types";

export const handleImage = async (images: string[], library: Library) => {
  for (const image of images) {
    const metadata = fs.readJsonSync(image) as Metadata;
    await transformImage(metadata, library);
  }

  // 清除sqlite中已经删除的图片
  await prisma.image.deleteMany({
    where: {
      id: {
        notIn: images.map((image) => {
          const info = image.match(/(\d|[a-zA-Z])+\.info/g);
          return info?.[0].replace(".info", "") || "";
        }),
      },
    },
  });
};

export const transformImage = async (metadata: Metadata, library: Library) => {
  if (!SUPPORT_EXT.includes(metadata.ext)) return null;

  const imageInput: Prisma.ImageCreateInput = {
    ...metadata,
    tags: JSON.stringify(metadata.tags),
    palettes: JSON.stringify(metadata.palettes),
    library: { connect: { id: library.id } },
    btime: new Date(metadata.btime),
    mtime: new Date(metadata.mtime),
    modificationTime: new Date(metadata.modificationTime),
    lastModified: new Date(metadata.lastModified),
    deletedTime: new Date(metadata.deletedTime),
    folders: { connect: metadata.folders?.map((id) => ({ id })) },
  };

  const res = await prisma.image.upsert({
    where: { id: metadata.id },
    update: imageInput,
    create: imageInput,
  });

  return res;
};
