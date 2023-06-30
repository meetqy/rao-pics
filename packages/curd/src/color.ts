import { z } from "zod";

import { prisma } from "@acme/db";

export const ColorInput = {
  get: z.object({
    imageId: z.number(),
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
};
