import { z } from "zod";

import type { Prisma } from "@rao-pics/db";
import { prisma } from "@rao-pics/db";

import { router } from "..";
import { t } from "./utils";

export const image = t.router({
  findUnique: t.procedure
    .input(
      z.object({
        id: z.number().optional(),
        path: z.string().optional(),
        includes: z.enum(["tags", "colors", "folders"]).array().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { includes } = input;

      return prisma.image.findUnique({
        where: {
          id: input.id,
          path: input.path,
        },
        include: {
          tags: includes?.includes("tags"),
          colors: includes?.includes("colors"),
          folders: includes?.includes("folders"),
        },
      });
    }),

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
        thumbnailPath: z.string().optional(),
        duration: z.number().optional(),
        annotation: z.string().optional(),
        url: z.string().optional(),
        isDeleted: z.boolean().optional(),
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
      const caller = router.createCaller({});
      const data: Prisma.ImageUpdateInput = {
        path: input.path,
        name: input.name,
        size: input.size,
        ext: input.ext,
        width: input.width,
        height: input.height,
        thumbnailPath: input.thumbnailPath,
        duration: input.duration,
        annotation: input.annotation,
        url: input.url,
        mtime: input.mtime,
        isDeleted: input.isDeleted,
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
      await caller.log.delete(res.path);

      return res;
    }),

  deleteByUnique: t.procedure
    .input(
      z
        .object({ id: z.number().optional(), path: z.string().optional() })
        .partial()
        .refine(
          (input) => !!input.id || !!input.path,
          "id or path either one is required",
        ),
    )
    .mutation(async ({ input }) => {
      const { id, path } = input;

      if (id) {
        return prisma.image.delete({ where: { id } });
      }

      if (path) {
        return prisma.image.delete({ where: { path } });
      }

      return null;
    }),

  get: t.procedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).optional(),
          cursor: z.string().nullish(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const limit = input?.limit ?? 50;

      const { cursor } = input ?? {};

      const images = await prisma.image.findMany({
        take: limit + 1,
        cursor: cursor ? { path: cursor } : undefined,
        orderBy: { createdTime: "desc" },
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
