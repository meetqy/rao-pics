import { z } from "zod";

import { prisma } from "@acme/db";

export const FailInput = {
  create: z.object({
    libraryId: z.number(),
    path: z.string(),
  }),
};

export const Fail = {
  create: (obj: z.infer<(typeof FailInput)["create"]>) => {
    const input = FailInput.create.parse(obj);
    return prisma.fails.create({
      data: {
        libraryId: input.libraryId,
        path: input.path,
      },
    });
  },
};
