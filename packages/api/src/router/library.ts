import { z } from "zod";

import { t } from "../trpc";

export const libraryRouter = t.router({
  get: t.procedure.query(({ ctx }) => {
    return ctx.prisma.library.findMany();
  }),

  add: t.procedure.input(z.string()).
  mutation(({ ctx, input }) => {
    return ctx.prisma.library.create({
      data: {
        name: input
      },
    });
  }),

  remove: t.procedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.library.delete({
        where: { id: input },
      });
    }),
});
