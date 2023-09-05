import { z } from "zod";

import { prisma } from "@rao-pics/db";
import { rgbToNumber } from "@rao-pics/utils";

import { t } from "./utils";

export const color = t.router({
  upsert: t.procedure
    .input(z.array(z.number()).length(3).or(z.number()))
    .mutation(async ({ input }) => {
      if (typeof input === "number") {
        return await prisma.color.upsert({
          where: { rgb: input },
          create: { rgb: input },
          update: { rgb: input },
        });
      }

      const rgbNumber = rgbToNumber(input);
      const n = Math.round(rgbNumber / 100) * 100;

      if (!n) throw new Error("Invalid color");

      return await prisma.color.upsert({
        where: { rgb: n },
        create: { rgb: n },
        update: { rgb: n },
      });
    }),

  delete: t.procedure
    .input(z.array(z.number()).length(3))
    .mutation(async ({ input }) => {
      const n = rgbToNumberMutilple100(input);

      if (!n) throw new Error("Invalid color");

      return await prisma.color.deleteMany({
        where: { rgb: n },
      });
    }),

  deleteWithNotConnectImage: t.procedure.mutation(async () => {
    return await prisma.color.deleteMany({
      where: {
        images: {
          none: {},
        },
      },
    });
  }),
});

export const rgbToNumberMutilple100 = (input: number[]) => {
  const rgbNumber = rgbToNumber(input);
  const n = Math.round(rgbNumber / 100) * 100;

  return n;
};
