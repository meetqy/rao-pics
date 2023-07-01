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
  upsert: (obj: z.infer<(typeof PendingInput)["upsert"]>) => {
    const input = PendingInput.upsert.parse(obj);
    return prisma.pending.upsert({
      where: { path: input.path },
      create: { path: input.path, libraryId: input.libraryId },
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
