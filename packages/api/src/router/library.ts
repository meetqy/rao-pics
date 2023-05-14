import { z } from "zod";

import { t } from "../trpc";

const LibraryAddInput = z.object({
  name: z.string(),
  dir: z.string(),
  type: z.enum(["eagle", "pixcall", "billfish"]),
  fileCount: z.number().optional(),
});

export type LibraryAdd = z.infer<typeof LibraryAddInput>;

export const libraryRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.library.findMany();
  }),

  add: t.procedure.input(LibraryAddInput).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.library.create({
      data: input,
    });
  }),

  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        fileCount: z.number().optional(),
        lastSyncTime: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.library.update({
        where: { id: input.id },
        data: input,
      });
    }),

  remove: t.procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.image.deleteMany({
      where: { libraryId: input },
    });

    await ctx.prisma.folder.deleteMany({
      where: { libraryId: input },
    });

    await ctx.prisma.tagsGroup.deleteMany({
      where: { libraryId: input },
    });

    return await ctx.prisma.library.delete({
      where: { id: input },
    });
  }),
});
