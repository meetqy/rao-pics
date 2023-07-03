import { differenceBy } from "lodash";
import { z } from "zod";

import { CONSTANT } from "@acme/constant";
import { prisma, type Color, type Folder, type Prisma, type Tag } from "@acme/db";

import curd from "..";

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return Math.ceil(n / 100) * 100;
};

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
      .optional(),
    tags: z.array(z.string()).optional(),
    /** @type 只会保存 9 种颜色 */
    colors: z.array(z.string().length(7).startsWith("#")).optional(),
  }),

  delete: z.object({
    id: z.number().optional(),
    path: z.string().optional(),
  }),

  update: z.object({
    libraryId: z.number(),
    id: z.number(),
    path: z.string().optional(),
    thumbnailPath: z.string().optional(),
    name: z.string().optional(),
    size: z.number().optional(),
    createTime: z.date().optional(),
    lastTime: z.date().optional(),
    ext: z.enum(CONSTANT.EXT).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
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
  }),

  get: z.object({
    id: z.union([z.number(), z.array(z.number())]).optional(),
    path: z.string().optional(),
  }),
};

export const Image = {
  get: (obj: z.infer<(typeof ImageInput)["get"]>) => {
    const input = ImageInput.get.parse(obj);

    const { id, path } = input;

    const where: Prisma.ImageWhereInput = {};

    if (id) {
      where.id = {
        in: typeof input.id === "number" ? [input.id] : input.id,
      };
    }

    if (path) {
      where.path = path;
    }

    return prisma.image.findMany({
      where,
      include: {
        folders: true,
        tags: true,
        colors: true,
      },
    });
  },

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
          ...new Set(input.colors.splice(0, 9).map((color) => hexToRgb(color))),
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
    const oldImage = await curd.image.get({ id: input.id });

    // 更新 tag/folder/color 时，只有一种情况，删除/新增。不会修改到 tag/folder/color 本身。
    const updateArgs: Prisma.ImageUpdateArgs = {
      where: { id: input.id },
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
      },
    };

    updateArgs.data["folders"] = input.folders ? updateFolders(input.folders, oldImage[0]?.folders || []) : undefined;
    updateArgs.data["tags"] = input.tags ? updateTags(input.tags, oldImage[0]?.tags || []) : undefined;
    updateArgs.data["colors"] = input.colors ? updateColors(input.colors, oldImage[0]?.colors || []) : undefined;

    return await prisma.image.update(updateArgs);
  },
};

const updateFolders = (folders: { id: string }[], oldFolders: Folder[]) => {
  const waitDeleteIds = folders.length === 0 ? oldFolders : differenceBy(folders, oldFolders, "id");

  return {
    disconnect: waitDeleteIds.map((f) => ({ id: f.id })),
    connect: folders.map((f) => ({ id: f.id })),
  };
};

const updateTags = (tags: string[], oldTags: Tag[]) => {
  const waitDeleteIds =
    tags.length === 0
      ? oldTags
      : differenceBy(
          tags.map((t) => ({ name: t })),
          oldTags,
          "name",
        );

  return {
    disconnect: waitDeleteIds.map((item) => ({ name: item.name })),
    connect: tags.map((tag) => ({ name: tag })),
  };
};

const updateColors = (colors: string[], oldColors: Color[]) => {
  const waitDeleteIds =
    colors.length === 0
      ? oldColors
      : differenceBy(
          colors.map((c) => ({ rgb: hexToRgb(c) })),
          oldColors,
          "rgb",
        );

  return {
    disconnect: waitDeleteIds.map((item) => ({ rgb: item.rgb })),
    connect: colors.map((c) => ({ rgb: hexToRgb(c) })),
  };
};
