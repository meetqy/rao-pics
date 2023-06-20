import { z } from "zod";

import { type PrismaClient } from "@acme/db";

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
export function Tag(this: PrismaClient) {
  const _ = {
    get: (obj: z.infer<(typeof TagInput)["get"]>) => {
      const { library } = obj;

      return this.tag.findMany({
        where: {
          OR: [{ libraryId: typeof library === "number" ? library : undefined }, { library: { name: library.toString() } }],
        },
        include: {
          _count: {
            select: { images: true },
          },
        },
      });
    },

    delete: (obj: z.infer<(typeof TagInput)["delete"]>) => {
      return this.tag.deleteMany({
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
      return this.tag.deleteMany({
        where: {
          libraryId,
          images: { none: {} },
        },
      });
    },
  };

  return _;
}
