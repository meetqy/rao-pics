import { z } from "zod";

import { prisma } from "@rao-pics/db";

import { t } from "./utils";

export const color = t.router({
  upsert: t.procedure
    .input(z.array(z.number()).length(3))
    .mutation(async ({ input }) => {
      const [r = 0, g = 0, b = 0] = input;

      const n = rgbTo16BitHex([r, g, b]);
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
      const [r = 0, g = 0, b = 0] = input;

      const n = rgbTo16BitHex([r, g, b]);
      if (!n) throw new Error("Invalid color");

      return await prisma.color.deleteMany({
        where: { rgb: n },
      });
    }),
});

/**
 * Color rgb to 16-bit hex
 * @param rgb
 */
export const rgbTo16BitHex = (rgb: number[] | number) => {
  if (typeof rgb === "number") {
    rgb = [rgb >> 16, (rgb >> 8) & 255, rgb & 255];
  }

  if (rgb.length !== 3) return undefined;

  const r = Math.round(((rgb[0] ?? 0) / 255) * 31);
  const g = Math.round(((rgb[1] ?? 0) / 255) * 31);
  const b = Math.round(((rgb[2] ?? 0) / 255) * 31);

  const color = (r << 11) | (g << 6) | b;

  const num = parseInt(color.toString(16).padStart(4, "0"), 16) / 100;

  return Math.ceil(num) * 100;
};
