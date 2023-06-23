import { z } from "zod";

import { prisma } from "@acme/db";

import { t } from "../trpc";

export const config = t.router({
  get: t.procedure.query(async () => {
    return await prisma.config.findFirst();
  }),

  update: t.procedure
    .input(
      z.object({
        assetsPort: z.number(),
        ip: z.string(),
        webPort: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.config.upsert({
        where: { id: "config" },
        update: input,
        create: {
          id: "config",
          ...input,
        },
      });
    }),
});
