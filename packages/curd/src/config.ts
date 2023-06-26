import { z } from "zod";

import { type PrismaClient } from "@acme/db";

export const ConfigInput = {
  update: z.object({
    assetsPort: z.number(),
    ip: z.string(),
    webPort: z.number(),
  }),
};

export function Config(this: PrismaClient) {
  const _ = {
    get: () => {
      return this.config.findFirst();
    },

    update: (input: z.infer<(typeof ConfigInput)["update"]>) => {
      return this.config.upsert({
        where: { id: "config" },
        update: input,
        create: {
          id: "config",
          ...input,
        },
      });
    },
  };

  return _;
}
