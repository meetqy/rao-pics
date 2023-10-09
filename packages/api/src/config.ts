import { z } from "zod";

import { DEFAULT_THEME } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const configInput = {
  upsert: z.object({
    language: z.enum(["zh-cn", "en-us", "zh-tw"]).optional(),
    theme: z.string().optional(),
    color: z.string().optional(),
    serverPort: z.number().optional(),
    clientPort: z.number().optional(),
    ip: z.string().optional(),
    pwdFolder: z.boolean().optional(),
    trash: z.boolean().optional(),
  }),
};

export const configCore = {
  findUnique: async () =>
    await prisma.config.findFirst({ where: { name: "config" } }),

  upsert: async (input: z.infer<typeof configInput.upsert>) => {
    return await prisma.config.upsert({
      where: { name: "config" },
      update: input,
      create: {
        ...input,
        name: "config",
        language: input.language ?? "zh-cn",
        color: input.color ?? "light",
        theme: input.theme ?? DEFAULT_THEME,
      },
    });
  },
};

export const config = t.router({
  upsert: t.procedure
    .input(configInput.upsert)
    .mutation(({ input }) => configCore.upsert(input)),

  findUnique: t.procedure.query(configCore.findUnique),
});
