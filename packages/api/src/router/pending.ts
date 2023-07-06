import { z } from "zod";

import curd from "@acme/curd";

import { t } from "../trpc";

export const pending = t.router({
  getCount: t.procedure
    .input(
      z.object({
        libraryId: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.libraryId) return Promise.resolve(0);

      const res = await curd.pending.getCount({
        libraryId: input.libraryId,
      });

      return res._count;
    }),
});
