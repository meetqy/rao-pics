import { z } from "zod";

import { t } from "../../trpc";

export const getByLibrary = t.procedure
  .input(
    z.object({
      // id or name
      library: z.string(),
      limit: z.number().min(1).max(100).nullish(),
      // https://trpc.io/docs/reactjs/useinfinitequery
      // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
      cursor: z.string().nullish(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const limit = input.limit ?? 20;
    const { cursor } = input;

    const items = await ctx.prisma.image.findMany({
      where: {
        OR: [{ libraryId: input.library }, { library: { name: input.library } }],
      },
      // get an extra item at the end which we'll use as next cursor
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        folders: true,
      },
    });

    let nextCursor: typeof cursor;
    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem?.id;
    }

    return {
      items,
      nextCursor,
    };
  });
