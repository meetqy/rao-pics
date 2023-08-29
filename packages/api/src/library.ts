import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const library = t.router({
  get: t.procedure.query(async () => {
    return await prisma.library.findFirst();
  }),

  add: t.procedure.input(z.string()).mutation(async ({ input }) => {
    if (!input.endsWith(".library")) {
      throw new Error(`Must be a '.library' directory.`);
    }

    const res = await prisma.library.findMany({});
    if (res.length > 0) {
      throw new Error("Cannot add more than one library.");
    }

    return await prisma.library.create({
      data: {
        path: input,
        type: "eagle",
      },
    });
  }),

  delete: t.procedure.mutation(async () => {
    return await prisma.library.deleteMany();
  }),
});
