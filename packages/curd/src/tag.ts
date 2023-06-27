import { z } from "zod";

import { prisma } from "@acme/db";

export const TagInput = {
  get: z.object({
    /** library name or id */
    library: z.union([z.string(), z.number()]),
  }),

  delete: z.object({
    name: z.string(),
  }),

  cleanByImageZero: z.object({
    libraryId: z.number().optional(),
  }),
};

/**
 * Tag 不支持单独新建，只能通过 image 创建
 * Tag 中关联的 image 如果是 0 个，会被自动清除
 */
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

  delete: (obj: z.infer<(typeof TagInput)["delete"]>) => {
    return prisma.tag.deleteMany({
      where: {
        name: obj.name,
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
