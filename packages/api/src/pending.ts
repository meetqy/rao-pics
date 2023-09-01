import { z } from "zod";

import { PendingTypeEnumZod } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const pending = t.router({
  upsert: t.procedure
    .input(
      z.object({
        path: z.string(),
        type: PendingTypeEnumZod,
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.pending.upsert({
        where: { path: input.path },
        create: input,
        update: input,
      });
    }),

  get: t.procedure.input(z.string().optional()).query(async ({ input }) => {
    if (input) {
      return await prisma.pending.findUnique({ where: { path: input } });
    }

    return await prisma.pending.findMany();
  }),

  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.pending.delete({ where: { path: input } });
  }),
});
