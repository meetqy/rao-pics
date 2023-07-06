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

  delete: z
    .object({
      libraryId: z.number().optional(),
      path: z.string().optional(),
    })
    .partial()
    .refine((obj) => !!obj.libraryId || !!obj.path, "At least one of libraryId, path is required."),
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

  getCount: (obj: z.infer<(typeof PendingInput)["get"]>) => {
    return prisma.pending.aggregate({ where: { libraryId: obj.libraryId }, _count: true });
  },

  delete: (obj: z.infer<(typeof PendingInput)["delete"]>) => {
    const input = PendingInput.delete.parse(obj);

    if (input.libraryId) {
      return prisma.pending.deleteMany({ where: { libraryId: input.libraryId } });
    }

    return prisma.pending.delete({ where: { path: input.path } });
  },
};
