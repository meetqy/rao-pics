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
     * 清除没有图片的 tag
     */
    cleanByImageZero: (obj: z.infer<(typeof TagInput)["cleanByImageZero"]>) => {
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
