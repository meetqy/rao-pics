import { z } from "zod";

import curd from "@acme/curd";

import { t } from "../trpc";

export const sync = {
  start: t.procedure
    .input(
      z.object({
        libraryId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const res = await curd.library.get({ library: input.libraryId });
      const lib = res[0];

      if (lib) {
        // start syncing
      }
    }),

  subscription: t.procedure.subscription(() => {}),
};
