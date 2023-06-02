import { z } from "zod";

import { t } from "../trpc";

export const foldersRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        library: z.union([z.string(), z.number()]),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.folder.findMany({
        where: {
          OR: [{ libraryId: typeof input.library === "number" ? input.library : undefined }, { library: { name: input.library.toString() } }],
        },

        include: {
          images: {
            take: 1,
          },
          _count: {
            select: { images: true },
          },
        },
      });
    }),
});
