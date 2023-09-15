import { z } from "zod";

import { DEFAULT_THEME } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const config = t.router({
  upsert: t.procedure
    .input(
      z.object({
        language: z.enum(["zh-cn", "en-us", "zh-tw"]).optional(),
        theme: z.string().optional(),
        color: z.string().optional(),
        serverPort: z.number().optional(),
        clientPort: z.number().optional(),
        ip: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.config.upsert({
        where: { name: "config" },
        update: {
          language: input.language ?? undefined,
          color: input.color ?? undefined,
          theme: input.theme ?? undefined,
          ip: input.ip ?? undefined,
          serverPort: input.serverPort ?? undefined,
          clientPort: input.clientPort ?? undefined,
        },
        create: {
          name: "config",
          language: input.language ?? "zh-cn",
          color: input.color ?? "light",
          theme: input.theme ?? DEFAULT_THEME,
          ip: input.ip,
          serverPort: input.serverPort,
          clientPort: input.clientPort,
        },
      });
    }),

  get: t.procedure.query(async () => {
    return await prisma.config.findFirst({ where: { name: "config" } });
  }),
});
