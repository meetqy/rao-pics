import { z } from "zod";

import { t } from "../trpc";

export const libraryRouter = t.router({
  get: t.procedure.query(({ ctx }) => {
    return ctx.prisma.library.findMany();
  }),

  add: t.procedure
    .input(
      z.object({
        name: z.string(),
        dir: z.string(),
        fileCount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

  remove: t.procedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.library.delete({
      where: { id: input },
    });
  }),
});
