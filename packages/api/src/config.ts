import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const config = t.router({
  upsert: t.procedure
    .input(
      z.object({
        language: z.enum(["zh-cn", "en-us", "zh-tw"]),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.config.upsert({
        where: { name: "config" },
        update: { language: input.language },
        create: { name: "config", language: input.language },
      });
    }),

  get: t.procedure.query(async () => {
    return await prisma.config.findFirst({ where: { name: "config" } });
  }),
});
