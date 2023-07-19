import { z } from "zod";

import { Prisma, prisma } from "@acme/db";

import { t } from "../../trpc";

export const groupByFieldCount = t.procedure.input(z.nativeEnum(Prisma.ImageScalarFieldEnum)).query(async ({ input }) => {
  return await prisma.image.groupBy({
    by: [input],
    _sum: {
      id: true,
    },
  });
});
