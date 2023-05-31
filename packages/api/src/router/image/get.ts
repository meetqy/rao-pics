import { z } from "zod";

import { t } from "../../trpc";

const ExtEnum = z.enum(["jpg", "png", "gif", "jpeg", "bmp"]);
const OrderByObject = z.object({
  createTime: z.enum(["asc", "desc"]).optional(),
  size: z.enum(["asc", "desc"]).optional(),
  name: z.enum(["asc", "desc"]).optional(),
});
export type ExtEnum = z.infer<typeof ExtEnum>;
export type OrderByObject = z.infer<typeof OrderByObject>;

export const get = t.procedure
  .input(
    z.object({
      // id or name
      library: z.union([z.string(), z.number()]),
      limit: z.number().min(1).max(100).nullish(),
      ext: ExtEnum.optional(),
      tag: z.string().optional(),
      // https://trpc.io/docs/reactjs/useinfinitequery
      // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
      cursor: z.string().nullish(),
      orderBy: OrderByObject.optional(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const limit = input.limit ?? 20;
    const { cursor, orderBy, tag } = input;

    const items = await ctx.prisma.image.findMany({
      where: {
        OR: [{ libraryId: typeof input.library === "number" ? input.library : undefined }, { library: { name: input.library.toString() } }],
        AND: [{ ext: input.ext, tags: tag ? { some: { name: { equals: tag } } } : undefined }],
      },
      // get an extra item at the end which we'll use as next cursor
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
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
