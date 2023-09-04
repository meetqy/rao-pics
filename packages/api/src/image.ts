import { z } from "zod";

import type { Prisma } from "@rao-pics/db";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const image = t.router({
  findUnique: t.procedure
    .input(
      z.object({
        id: z.number().optional(),
        path: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return prisma.image.findUnique({
        where: {
          id: input.id,
          path: input.path,
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
        thumbnailPath: z.string().optional(),
        duration: z.number().optional(),
        annotation: z.string().optional(),
        url: z.string().optional(),
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
        thumbnailPath: input.thumbnailPath,
        duration: input.duration,
        annotation: input.annotation,
        url: input.url,
        lastTime: new Date(),
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

      return res;
    }),
});
