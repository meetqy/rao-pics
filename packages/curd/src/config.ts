import { z } from "zod";

import { prisma } from "@acme/db";

export const ConfigInput = {
  update: z.object({
    assetsPort: z.number(),
    ip: z.string(),
    webPort: z.number(),
  }),
};

export const Config = {
  get: () => {
    return prisma.config.findFirst();
  },

  update: (input: z.infer<(typeof ConfigInput)["update"]>) => {
    return prisma.config.upsert({
      where: { id: "config" },
      update: input,
      create: {
        id: "config",
        ...input,
      },
    });
  },
};
