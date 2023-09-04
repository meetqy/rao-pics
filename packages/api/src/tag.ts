import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const tag = t.router({
  upsert: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.tag.upsert({
      where: { name: input },
      create: { name: input },
      update: { name: input },
    });
  }),

  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.tag.deleteMany({
      where: {
        name: input,
      },
    });
  }),
});
