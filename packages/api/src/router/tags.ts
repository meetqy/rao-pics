import { t } from "../trpc";

export const tagsRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.image.groupBy({
      by: ["tags"],
      _count: {
        tags: true,
      },
      orderBy: {
        _count: {
          tags: "desc",
        },
      },
    });
  }),
});
