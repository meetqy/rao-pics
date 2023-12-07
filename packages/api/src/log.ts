import { z } from "zod";

import { LogTypeEnumZod } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const logInput = {
  upsert: z.object({
    path: z.string(),
    type: LogTypeEnumZod,
    message: z.string(),
  }),
};

export const logCore = {
  upsert: async (input: z.infer<(typeof logInput)["upsert"]>) => {
    return await prisma.log.upsert({
      where: { path: input.path },
      create: input,
      update: input,
    });
  },
};

export const log = t.router({
  upsert: t.procedure
    .input(logInput.upsert)
    .mutation(async ({ input }) => logCore.upsert(input)),

  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.log.deleteMany({ where: { path: input } });
  }),

  get: t.procedure
    .input(
      z.object({
        keywords: z.string().optional(),
        limit: z.number().min(1).max(100).optional(),
        cursor: z.string().nullish(),
        orderBy: z.enum(["asc", "desc"]).default("asc"),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;

      const { cursor, keywords = "", orderBy } = input;

      const logs = await prisma.log.findMany({
        where: {
          OR: [
            { path: { contains: keywords } },
            { type: { contains: keywords } },
          ],
        },
        take: limit + 1,
        cursor: cursor ? { path: cursor } : undefined,
        orderBy: { createdTime: orderBy },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (logs.length > limit) {
        const nextLog = logs.pop();
        nextCursor = nextLog!.path;
      }

      return {
        data: logs,
        nextCursor,
      };
    }),
});
