import { z } from "zod";

import { t } from "../trpc";

const LibraryAddInput = z.object({
  name: z.string(),
  dir: z.string(),
  type: z.enum(["eagle", "pixcall", "billfish"]),
  fileCount: z.number().optional(),
  failCount: z.number().optional(),
});

export type LibraryAdd = z.infer<typeof LibraryAddInput>;

export const libraryRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.library.findMany({
      include: {
        _count: { select: { images: true } },
      },
    });
  }),

  add: t.procedure.input(LibraryAddInput).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.library.create({
      data: input,
    });
  }),

  update: t.procedure
    .input(
      z.object({
        id: z.number(),
        fileCount: z.number().optional(),
        failCount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.library.update({
        where: { id: input.id },
        data: {
          ...input,
          lastSyncTime: new Date(),
        },
      });
    }),

  remove: t.procedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.$transaction([
      ctx.prisma.image.deleteMany({
        where: { libraryId: input },
      }),
      ctx.prisma.folder.deleteMany({
        where: { libraryId: input },
      }),
      ctx.prisma.tag.deleteMany({
        where: { libraryId: input },
      }),
    ]);

    return await ctx.prisma.library.delete({
      where: { id: input },
    });
  }),
});
