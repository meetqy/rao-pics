import { z } from "zod";

import { prisma } from "@rao-pics/db";

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

      const n = rgbTo16BitHex(input);
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

/**
 * Color rgb to 16-bit hex
 * @param rgb
 * @param multiple 倍数 默认 100
 */
export const rgbTo16BitHex = (rgb: number[] | number, multiple = 100) => {
  if (typeof rgb === "number") {
    rgb = [rgb >> 16, (rgb >> 8) & 255, rgb & 255];
  }

  if (rgb.length !== 3) return undefined;

  const r = Math.round(((rgb[0] ?? 0) / 255) * 31);
  const g = Math.round(((rgb[1] ?? 0) / 255) * 31);
  const b = Math.round(((rgb[2] ?? 0) / 255) * 31);

  const color = (r << 11) | (g << 6) | b;

  const num = parseInt(color.toString(16).padStart(4, "0"), 16) / multiple;

  return Math.ceil(num) * multiple;
};

export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
};

export const int16toRgb = (n: number) => {
  const hex = n.toString(16).padStart(4, "0");
  const [r = 255, g = 255, b = 255] = hexToRgb(hex);

  return [
    Math.round((r / 31) * 255),
    Math.round((g / 31) * 255),
    Math.round((b / 31) * 255),
  ];
};
