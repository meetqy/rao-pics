import { z } from "zod";

import { prisma } from "@acme/db";

export const FailInput = {
  create: z.object({
    libraryId: z.number(),
    path: z.string(),
  }),

  delete: z.object({
    libraryId: z.number(),
  }),
};

export const Fail = {
  create: async (obj: z.infer<(typeof FailInput)["create"]>) => {
    const input = FailInput.create.parse(obj);
    return await prisma.fails.create({
      data: {
        libraryId: input.libraryId,
        path: input.path,
      },
    });
  },

  delete: (obj: z.infer<(typeof FailInput)["delete"]>) => {
    const input = FailInput.delete.parse(obj);

    return prisma.fails.deleteMany({
      where: {
        libraryId: input.libraryId,
      },
    });
  },
};
