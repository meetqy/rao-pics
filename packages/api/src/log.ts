import { z } from "zod";

import { LogTypeEnumZod } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const log = t.router({
  upsert: t.procedure
    .input(
      z.object({
        path: z.string(),
        type: LogTypeEnumZod,
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.log.upsert({
        where: { path: input.path },
        create: input,
        update: input,
      });
    }),

  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.log.deleteMany({ where: { path: input } });
  }),
});
