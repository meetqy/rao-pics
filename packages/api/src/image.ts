import { z } from "zod";

import type { Prisma } from "@rao-pics/db";
import { prisma } from "@rao-pics/db";

import { getCaller } from "..";
import { t } from "./utils";

export const imageInput = {
  find: z.object({
    limit: z.number().min(1).max(100).optional(),
    cursor: z.string().nullish(),
    includes: z.enum(["tags", "colors", "folders"]).array().optional(),
    orderBy: z
      .object({
        modificationTime: z.enum(["asc", "desc"]).optional(),
        mtime: z.enum(["asc", "desc"]).optional(),
        name: z.enum(["asc", "desc"]).optional(),
      })
      .optional()
      .default({ modificationTime: "desc" }),
  }),

  findUnique: z.object({
    id: z.number().optional(),
    path: z.string().optional(),
    includes: z.enum(["tags", "colors", "folders"]).array().optional(),
  }),

  deleteByUnique: z
    .object({ id: z.number().optional(), path: z.string().optional() })
    .partial()
    .refine(
      (input) => !!input.id || !!input.path,
      "id or path either one is required",
    ),
};

export const imageCore = {
  /**
   *
   * @param input @type imageInput.findUnique
   * @param extra.isTrash 是否返回回收站(isDeleted=true)中的素材 默认 true
   * @param extra.isFolder 是否返回 folder.show=false 中的素材  默认 true
   */
  findUnique: async (
    input: z.infer<typeof imageInput.findUnique>,
    extra?: {
      isTrash: boolean;
      isFolder: boolean;
    },
  ) => {
    const { includes } = input;
    if (!extra) extra = { isTrash: true, isFolder: true };
    const { isTrash, isFolder } = extra;

    return await prisma.image.findUnique({
      where: {
        id: input.id,
        path: input.path,
        // true => undefined
        isDeleted: isTrash ? undefined : false,
        // true => undefined
        folders: isFolder
          ? undefined
          : {
              every: { show: true },
            },
      },
      include: {
        tags: includes?.includes("tags"),
        colors: includes?.includes("colors"),
        folders: includes?.includes("folders"),
      },
    });
  },

  deleteByUnique: async (input: z.infer<typeof imageInput.findUnique>) => {
    const { id, path } = input;

    if (id) {
      return prisma.image.delete({ where: { id } });
    }

    if (path) {
      return prisma.image.delete({ where: { path } });
    }

    return null;
  },
};

export const image = t.router({
  /**
   * 根据 id 或 path 查询素材
   * 不返回 回收站 和 不显示文件夹中的素材
   */
  findUnique: t.procedure
    .input(
      z.object({
        id: z.number().optional(),
        path: z.string().optional(),
        includes: z.enum(["tags", "colors", "folders"]).array().optional(),
      }),
    )
    .query(
      async ({ input }) =>
        await imageCore.findUnique(input, { isFolder: false, isTrash: false }),
    ),

  upsert: t.procedure
    .input(
      z.object({
        id: z.number().optional(),
        path: z.string(),
        name: z.string(),
        size: z.number(),
        ext: z.string(),
        width: z.number(),
        height: z.number(),
        mtime: z.date(),
        modificationTime: z.date().optional(),
        duration: z.number().optional(),
        annotation: z.string().optional(),
        url: z.string().optional(),
        isDeleted: z.boolean().optional(),
        blurDataURL: z.string().optional(),
        noThumbnail: z.boolean().optional().default(false),
        tags: z
          .object({
            connect: z.array(z.string()).optional(),
            disconnect: z.array(z.string()).optional(),
          })
          .optional(),
        colors: z
          .object({
            connect: z.array(z.number()).optional(),
            disconnect: z.array(z.number()).optional(),
          })
          .optional(),
        folders: z
          .object({
            connect: z.array(z.string()).optional(),
            disconnect: z.array(z.string()).optional(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const data: Prisma.ImageUpdateInput = {
        path: input.path,
        name: input.name,
        size: input.size,
        ext: input.ext,
        width: input.width,
        height: input.height,
        duration: input.duration,
        annotation: input.annotation,
        url: input.url,
        mtime: input.mtime,
        modificationTime: input.modificationTime,
        isDeleted: input.isDeleted,
        blurDataURL: input.blurDataURL,
        noThumbnail: input.noThumbnail,
      };

      const { tags, id, colors, folders } = input;

      if (tags) {
        data.tags = {};

        if (id) {
          data.tags.disconnect =
            tags.disconnect?.map((name) => ({ name })) ?? [];
        }

        data.tags.connect = tags.connect?.map((name) => ({ name })) ?? [];
      }

      if (colors) {
        data.colors = {};

        if (id) {
          data.colors.disconnect =
            colors.disconnect?.map((rgb) => ({ rgb })) ?? [];
        }

        data.colors.connect = colors.connect?.map((rgb) => ({ rgb })) ?? [];
      }

      if (folders) {
        data.folders = {};

        if (id) {
          data.folders.disconnect =
            folders.disconnect?.map((id) => ({ id })) ?? [];
        }

        data.folders.connect = folders.connect?.map((id) => ({ id })) ?? [];
      }

      let res;
      if (id) {
        res = await prisma.image.update({
          where: { id },
          data,
        });
      } else {
        res = await prisma.image.create({
          data: data as Prisma.ImageCreateInput,
        });
      }

      // 清除日志中的错误信息
      await getCaller().log.delete(res.path);

      return res;
    }),

  deleteByUnique: t.procedure
    .input(imageInput.deleteByUnique)
    .mutation(({ input }) => imageCore.deleteByUnique(input)),

  /**
   * 查询时不返回
   * 回收站 和 不显示文件夹中的素材
   */
  find: t.procedure
    .input(imageInput.find.optional())
    .query(async ({ input }) => {
      const limit = input?.limit ?? 50;
      const { cursor, includes, orderBy } = input ?? {};

      const where = {
        // 回收站的素材不显示
        isDeleted: false,
        // 文件夹显示的素材不显示
        folders: {
          every: { show: true },
        },
      };

      const images = await prisma.image.findMany({
        where,
        take: limit + 1,
        cursor: cursor ? { path: cursor } : undefined,
        orderBy,
        include: {
          tags: includes?.includes("tags"),
          colors: includes?.includes("colors"),
          folders: includes?.includes("folders"),
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (images.length > limit) {
        const nextImage = images.pop();
        nextCursor = nextImage!.path;
      }

      const count = await prisma.image.count({ where });

      return {
        data: images,
        nextCursor,
        count,
      };
    }),

  /**
   * 根据文件夹 id 查询素材
   */
  findByFolderId: t.procedure
    .input(imageInput.find.merge(z.object({ id: z.string() })))
    .query(async ({ input }) => {
      const limit = input?.limit ?? 50;
      const { cursor, includes, orderBy, id } = input ?? {};

      const images = await prisma.image.findMany({
        where: {
          isDeleted: false,
          folders: {
            some: {
              AND: [{ id }, { show: true }],
            },
          },
        },
        take: limit + 1,
        cursor: cursor ? { path: cursor } : undefined,
        orderBy,
        include: {
          tags: includes?.includes("tags"),
          colors: includes?.includes("colors"),
          folders: includes?.includes("folders"),
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (images.length > limit) {
        const nextImage = images.pop();
        nextCursor = nextImage!.path;
      }

      return {
        data: images,
        nextCursor,
      };
    }),

  /**
   * 回收站中的素材
   */
  findTrash: t.procedure
    .input(imageInput.find.optional())
    .query(async ({ input }) => {
      const limit = input?.limit ?? 50;
      const { cursor, includes, orderBy } = input ?? {};

      const images = await prisma.image.findMany({
        where: {
          isDeleted: true,
        },
        take: limit + 1,
        cursor: cursor ? { path: cursor } : undefined,
        orderBy,
        include: {
          tags: includes?.includes("tags"),
          colors: includes?.includes("colors"),
          folders: includes?.includes("folders"),
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (images.length > limit) {
        const nextImage = images.pop();
        nextCursor = nextImage!.path;
      }

      return {
        data: images,
        nextCursor,
      };
    }),
});
