import { z } from "zod";

import { CONSTANT } from "@acme/constant";
import { prisma, type Prisma } from "@acme/db";

export const ImageInput = {
  create: z.object({
    libraryId: z.number(),
    path: z.string(),
    thumbnailPath: z.string(),
    name: z.string(),
    size: z.number(),
    createTime: z.date(),
    lastTime: z.date(),
    ext: z.enum(CONSTANT.EXT),
    width: z.number(),
    height: z.number(),
    duration: z.number().optional(),
    folders: z
      .array(
        z.object({
          id: z.string(),
          name: z.string().optional(),
        }),
      )
      .max(9)
      .optional(),
    tags: z.array(z.string()).optional(),
    /** @type 只有保存9种颜色 */
    colors: z.array(z.string().length(7).startsWith("#")).optional(),
  }),
};

export const Image = {
  /**
   * 创建图片的同时创建文件夹、标签、颜色
   * 文件夹、颜色，可以通过 id 修改，但是标签只能创建，不能修改。
   */
  create: (obj: z.infer<(typeof ImageInput)["create"]>) => {
    const input = ImageInput.create.parse(obj);

    let folders: Prisma.FolderUncheckedCreateNestedManyWithoutImagesInput | undefined;
    let tags: Prisma.TagUncheckedCreateNestedManyWithoutImagesInput | undefined;
    let colors: Prisma.ColorUncheckedCreateNestedManyWithoutImageInput | undefined;

    if (input.folders) {
      folders = {
        connectOrCreate: input.folders.map((folder) => ({
          where: { id: folder.id },
          create: {
            // 传入 id 时，使用 id 作为 folder 的 id，否则使用 name 作为 id
            id: folder.id,
            name: folder.name || folder.id,
            library: { connect: { id: input.libraryId } },
          },
        })),
      };
    }

    if (input.tags) {
      tags = {
        create: input.tags.map((tag) => ({ name: tag, library: { connect: { id: input.libraryId } } })),
      };
    }

    if (input.colors) {
      colors = {
        create: [
          // 颜色 9 种，每种颜色的值为 100 的倍数，并且去重，将颜色总数减少 100 倍。
          ...new Set(
            input.colors.splice(0, 9).map((color) => {
              const n = parseInt(color.replace("#", ""), 16);
              return Math.ceil(n / 100) * 100;
            }),
          ),
        ].map((color) => ({ rgb: color })),
      };
    }

    return prisma.image.create({
      data: {
        libraryId: input.libraryId,
        path: input.path,
        thumbnailPath: input.thumbnailPath,
        name: input.name,
        size: input.size,
        createTime: input.createTime,
        lastTime: input.lastTime,
        ext: input.ext,
        width: input.width,
        height: input.height,
        duration: input.duration,
        folders: folders,
        tags,
        colors,
      },
    });
  },
};
