import { z } from "zod";

import { prisma } from "@acme/db";

export const PendingInput = {
  upsert: z.object({
    path: z.string(),
    libraryId: z.number(),
  }),

  get: z.object({
    libraryId: z.number(),
  }),
};

export const Pending = {
  upsert: async (obj: z.infer<(typeof PendingInput)["upsert"]>) => {
    const input = PendingInput.upsert.parse(obj);

    return await prisma.pending.upsert({
      where: { path: input.path },
      create: input,
      update: {},
    });
  },

  get: (obj: z.infer<(typeof PendingInput)["get"]>) => {
    return prisma.pending.findMany({ where: { libraryId: obj.libraryId } });
  },

  delete: (path: string) => {
    return prisma.pending.delete({ where: { path } });
  },
};
