import { z } from "zod";

import curd from "@acme/curd";

import { t } from "../trpc";

export const config = t.router({
  get: t.procedure.query(() => {
    return curd.config.get();
  }),

  update: t.procedure
    .input(
      z.object({
        assetsPort: z.number(),
        ip: z.string(),
        webPort: z.number(),
      }),
    )
    .mutation(({ input }) => curd.config.update(input)),
});
