import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const config = t.router({
  upsert: t.procedure
    .input(
      z.object({
        language: z.enum(["zh-cn", "en-us", "zh-tw"]).optional(),
        theme: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.config.upsert({
        where: { name: "config" },
        update: input,
        create: {
          name: "config",
          language: input.language ?? "zh-cn",
          color: input.color ?? "tiga",
          theme: input.theme ?? "light",
        },
      });
    }),

  get: t.procedure.query(async () => {
    return await prisma.config.findFirst({ where: { name: "config" } });
  }),
});
