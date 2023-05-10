import { z } from "zod";

import { t } from "../trpc";

export const exampleRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  add: t.procedure.mutation(({ ctx }) => {
    return ctx.prisma.example.create({
      data: { id: Date.now().toString() },
    });
  }),
  remove: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.example.delete({
        where: { id: input.id },
      });
    }),
});
