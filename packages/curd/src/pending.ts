import { z } from "zod";

import { prisma } from "@acme/db";

export const PendingInput = {
  upsert: z.object({
    path: z.string(),
    libraryId: z.number(),
    type: z.enum(["create", "update", "delete"]),
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
      update: { type: input.type },
    });
  },

  get: async (obj: z.infer<(typeof PendingInput)["get"]>) => {
    return await prisma.pending.findMany({ where: { libraryId: obj.libraryId } });
  },

  delete: (path: string) => {
    return prisma.pending.delete({ where: { path } });
  },
};
