import { z } from "zod";

import { t } from "../trpc";

export const tagsRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        library: z.union([z.string(), z.number()]),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.tag.findMany({
        where: {
          OR: [{ libraryId: typeof input.library === "number" ? input.library : undefined }, { library: { name: input.library.toString() } }],
        },
        include: {
          _count: {
            select: { images: true },
          },
        },
      });
    }),
});
