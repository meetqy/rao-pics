import { z } from "zod";

import { prisma, type Prisma } from "@acme/db";

export const TagInput = {
  get: z.object({
    /** library name or id */
    library: z.union([z.string(), z.number()]),
  }),

  upsert: z.object({
    name: z.string(),
    libraryId: z.number(),
    imageIds: z.array(z.string()).optional(),
  }),

  delete: z.object({
    name: z.string(),
  }),

  cleanByImageZero: z.object({
    libraryId: z.number().optional(),
  }),

  clear: z.object({
    libraryId: z.number(),
  }),
};

export const Tag = {
  get: (obj: z.infer<(typeof TagInput)["get"]>) => {
    const { library } = obj;

    return prisma.tag.findMany({
      where: {
        OR: [{ libraryId: typeof library === "number" ? library : undefined }, { library: { name: library.toString() } }],
      },
      include: {
        images: {
          take: 1,
          orderBy: { lastTime: "desc" },
        },
        _count: {
          select: { images: true },
        },
      },
    });
  },

  upsert: (obj: z.infer<(typeof TagInput)["upsert"]>) => {
    const { libraryId, name, imageIds } = obj;
    const input: Prisma.TagCreateInput = {
      name,
      library: {
        connect: { id: libraryId },
      },
    };

    if (imageIds) {
      input.images = {
        connect: imageIds.map((id) => ({ id })),
      };
    }

    return prisma.tag.upsert({
      where: { name },
      create: input,
      update: input,
    });
  },

  delete: (obj: z.infer<(typeof TagInput)["delete"]>) => {
    return prisma.tag.deleteMany({
      where: {
        name: obj.name,
      },
    });
  },

  clear: (obj: z.infer<(typeof TagInput)["clear"]>) => {
    const { libraryId } = obj;
    return prisma.tag.deleteMany({
      where: {
        libraryId,
      },
    });
  },

  /**
   * 清除 image 数量为 0 的 Tag
   */
  cleanWithImageZero: (obj: z.infer<(typeof TagInput)["cleanByImageZero"]>) => {
    const { libraryId } = obj;
    return prisma.tag.deleteMany({
      where: {
        libraryId,
        images: { none: {} },
      },
    });
  },
};
