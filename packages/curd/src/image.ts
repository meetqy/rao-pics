import { z } from "zod";

import { CONSTANT } from "@acme/constant";
import { prisma, type Folder, type Prisma } from "@acme/db";

import curd from "..";

const create = z.object({
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
    .optional(),
  tags: z.array(z.string()).optional(),
  /** @type 只会保存 9 种颜色 */
  colors: z.array(z.string().length(7).startsWith("#")).optional(),
});

export const ImageInput = {
  create,

  delete: z.object({
    id: z.number().optional(),
    path: z.string().optional(),
  }),

  update: z.object({
    ...create.shape,
    id: z.number(),
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
        connectOrCreate: input.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag, library: { connect: { id: input.libraryId } } },
        })),
      };
    }

    if (input.colors) {
      colors = {
        connectOrCreate: [
          // 颜色 9 种，每种颜色的值为 100 的倍数，并且去重，将颜色总数减少 100 倍。
          ...new Set(
            input.colors.splice(0, 9).map((color) => {
              const n = parseInt(color.replace("#", ""), 16);
              return Math.ceil(n / 100) * 100;
            }),
          ),
        ].map((color) => ({
          where: { rgb: color },
          create: { rgb: color },
        })),
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

  delete: (obj: z.infer<(typeof ImageInput)["delete"]>) => {
    const input = ImageInput.delete.parse(obj);

    const where: Prisma.ImageWhereInput = {};

    if (input.id) {
      where.id = input.id;
    }

    if (input.path) {
      where.path = input.path;
    }

    return prisma.image.deleteMany({ where });
  },

  update: async (obj: z.infer<(typeof ImageInput)["update"]>) => {
    const input = ImageInput.update.parse(obj);
    const [oldTags, oldFolders] = await Promise.all([curd.tag.get({ imageId: input.id }), curd.folder.get({ imageId: input.id })]);

    if (input.folders) {
      // await curd.folder.upsert()
    }

    // 找出被删除的 folder， disconnect
    // const disconnectFolder = findDisconnectFolder(oldFolders, input.folders);
  },
};

const findDisconnectFolder = (oldFolders: Folder[], newFolders: { id: string }[]): string[] => {
  return [];
};
