import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const folder = t.router({
  upsert: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        pid: z.string().optional(),
        password: z.string().optional(),
        passwordTips: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.folder.upsert({
        where: { id: input.id },
        create: input,
        update: input,
      });
    }),

  find: t.procedure
    .input(
      z
        .object({
          id: z.string().optional(),
          pid: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      if (input?.id) {
        return await prisma.folder.findUnique({
          where: { id: input.id },
        });
      }

      if (input?.pid) {
        return await prisma.folder.findMany({
          where: { pid: input.pid },
        });
      }

      return await prisma.folder.findMany();
    }),
});
