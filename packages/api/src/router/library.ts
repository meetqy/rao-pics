import { z } from "zod";

import { CONSTANT } from "@acme/constant";
import curd, { ZodInput } from "@acme/curd";
import { prisma } from "@acme/db";

import { t } from "../trpc";

const LibraryAddInput = z.object({
  name: z.string(),
  dir: z.string(),
  type: z.enum(CONSTANT.APP),
});

export type LibraryAdd = z.infer<typeof LibraryAddInput>;

export const library = t.router({
  get: t.procedure.input(ZodInput.library.get).query(({ input }) => curd.library.get(input)),

  add: t.procedure.input(LibraryAddInput).mutation(async ({ input }) => {
    return await prisma.library.create({
      data: input,
    });
  }),

  update: t.procedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.library.update({
        where: { id: input.id },
        data: {
          lastSyncTime: new Date(),
        },
      });
    }),

  remove: t.procedure.input(z.number()).mutation(async ({ input }) => {
    await prisma.$transaction([
      prisma.image.deleteMany({
        where: { libraryId: input },
      }),
      prisma.folder.deleteMany({
        where: { libraryId: input },
      }),
      prisma.tag.deleteMany({
        where: { libraryId: input },
      }),
    ]);

    return await prisma.library.delete({
      where: { id: input },
    });
  }),
});
