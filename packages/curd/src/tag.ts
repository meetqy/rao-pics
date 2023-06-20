import { z } from "zod";

import { type PrismaClient } from "@acme/db";

export const TagInput = {
  get: z.object({
    /** library name or id */
    library: z.union([z.string(), z.number()]),
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
  };

  return _;
}
