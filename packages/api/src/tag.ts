import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const tag = t.router({
  create: t.procedure.input(z.string()).mutation(async ({ input }) => {
    await prisma.tag.create({
      data: {
        name: input,
      },
    });
  }),
});
