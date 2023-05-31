import { t } from "../trpc";

export const tagsRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.tag.findMany({
      include: {
        _count: {
          select: { images: true },
        },
      },
    });
  }),
});
