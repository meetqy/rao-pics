import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const image = t.router({
  findUnique: t.procedure
    .input(
      z.object({
        id: z.number().optional(),
        path: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return prisma.image.findUnique({
        where: {
          id: input.id,
          path: input.path,
        },
      });
    }),
});
