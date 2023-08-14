import { z } from "zod";

import { prisma } from "@acme/db";
import { hexToRgb } from "@acme/util";

export const ColorInput = {
  get: z.object({
    imageId: z.number(),
  }),

  upsert: z.object({
    imageId: z.number(),
    color: z.string().length(7).startsWith("#"),
  }),
};

export const Color = {
  get: async (obj: z.infer<(typeof ColorInput)["get"]>) => {
    const input = ColorInput.get.parse(obj);

    const res = await prisma.image.findMany({
      where: { id: input.imageId },
      select: {
        colors: true,
      },
    });

    const img = res[0];

    if (!img) return [];

    return img.colors;
  },

  upsert: async (obj: z.infer<(typeof ColorInput)["upsert"]>) => {
    const input = ColorInput.upsert.parse(obj);
    const rgb = hexToRgb(input.color);

    return prisma.color.upsert({
      where: { rgb },
      create: {
        rgb,
        images: {
          connect: { id: input.imageId },
        },
      },
      update: {},
    });
  },

  /**
   * 清空没有图片的颜色
   */
  clear: () => {
    return prisma.color.deleteMany({
      where: {
        images: {
          none: {},
        },
      },
    });
  },
};
