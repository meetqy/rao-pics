import { z } from "zod";

import { CONSTANT } from "@acme/constant";
import { prisma, type Prisma } from "@acme/db";

export const ImageInput = {
  create: z.object({
    libraryId: z.number(),
    name: z.string(),
    size: z.number(),
    createTime: z.date(),
    lastTime: z.date(),
    ext: z.enum(CONSTANT.EXT),
    width: z.number(),
    height: z.number(),
    duration: z.number().optional(),
    noThumbnail: z.boolean().optional(),
    extendId: z.string().optional(),
    folders: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
        }),
      )
      .optional(),
    tags: z.array(z.string()).optional(),
    colors: z
      .array(
        z.object({
          rgb: z.number(),
          ratio: z.number(),
        }),
      )
      .optional(),
  }),
};

export const Image = {
  create: (input: z.infer<(typeof ImageInput)["create"]>) => {
    let folders: Prisma.FolderUncheckedCreateNestedManyWithoutImagesInput | undefined;
    let tags: Prisma.TagUncheckedCreateNestedManyWithoutImagesInput | undefined;
    let colors: Prisma.ColorUncheckedCreateNestedManyWithoutImageInput | undefined;

    if (input.folders) {
      folders = {
        connectOrCreate: input.folders.map((folder) => ({
          where: { name: folder.name },
          create: {
            name: folder.name,
            // 传入 id 时，使用 id 作为 folder 的 id，否则使用 name 作为 id
            id: folder.id || folder.name,
            library: { connect: { id: input.libraryId } },
          },
        })),
      };
    }

    if (input.tags) {
      tags = {
        connectOrCreate: input.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag, library: { connect: { id: input.libraryId } } },
        })),
      };
    }

    if (input.colors) {
      colors = {
        connectOrCreate: input.colors.map((color) => ({
          where: { rgb: color.rgb },
          create: { rgb: color.rgb, ratio: color.ratio },
        })),
      };
    }

    return prisma.image.create({
      data: {
        libraryId: input.libraryId,
        name: input.name,
        size: input.size,
        createTime: input.createTime,
        lastTime: input.lastTime,
        ext: input.ext,
        width: input.width,
        height: input.height,
        duration: input.duration,
        noThumbnail: input.noThumbnail,
        extendId: input.extendId,
        folders: folders,
        tags,
        colors,
      },
    });
  },
};
