import { z } from "zod";

import { t } from "../trpc";

export const configRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.config.findFirst();
  }),

  update: t.procedure
    .input(
      z.object({
        assetsPort: z.number(),
        ip: z.string(),
        webPort: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.config.upsert({
        where: { id: "config" },
        update: input,
        create: {
          id: "config",
          ...input,
        },
      });
    }),
});
