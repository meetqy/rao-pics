import { z } from "zod";

import { PendingTypeEnumZod } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const pendingInput = {
  upsert: z.object({
    path: z.string(),
    type: PendingTypeEnumZod,
  }),
};

export const pendingCore = {
  upsert: async (input: z.infer<(typeof pendingInput)["upsert"]>) => {
    return await prisma.pending.upsert({
      where: { path: input.path },
      create: input,
      update: input,
    });
  },

  get: async (input?: string) => {
    if (input) {
      return await prisma.pending.findUnique({ where: { path: input } });
    }

    return await prisma.pending.findMany();
  },

  delete: async (input: string) => {
    return await prisma.pending.delete({ where: { path: input } });
  },
};

export const pending = t.router({
  upsert: t.procedure
    .input(pendingInput.upsert)
    .mutation(({ input }) => pendingCore.upsert(input)),

  get: t.procedure
    .input(z.string().optional())
    .query(({ input }) => pendingCore.get(input)),

  delete: t.procedure
    .input(z.string())
    .mutation(({ input }) => pendingCore.delete(input)),
});
