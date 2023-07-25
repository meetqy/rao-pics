import { z } from "zod";

import { prisma, type Prisma } from "@acme/db";

import curd from "..";

export const LibraryInput = {
  get: z
    .object({
      library: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),

  create: z.object({
    name: z.string(),
    dir: z.string(),
    type: z.enum(["eagle", "pixcall", "billfish", "folder"]),
  }),

  delete: z.object({ id: z.number() }),
};

export const Library = {
  get: (obj: z.infer<(typeof LibraryInput)["get"]>) => {
    const input = LibraryInput.get.parse(obj);

    let where: Prisma.LibraryWhereInput | undefined;

    if (input && input.library) {
      const { library } = input;

      where = {
        OR: [{ id: typeof library === "number" ? library : undefined }, { name: library.toString() }],
      };
    }

    return prisma.library.findMany({
      where,
      include: {
        _count: { select: { images: true, pendings: true, fails: true } },
      },
    });
  },

  create: (obj: z.infer<(typeof LibraryInput)["create"]>) => {
    return prisma.library.create({
      data: obj,
    });
  },

  delete: async (obj: z.infer<(typeof LibraryInput)["delete"]>) => {
    const { id } = obj;

    await curd.fail.delete({ libraryId: id });
    await curd.image.delete({ libraryId: id });
    await curd.pending.delete({ libraryId: id });
    await curd.folder.delete({ libraryId: id });
    await curd.tag.delete({ libraryId: id });

    return prisma.library.delete({ where: { id } });
  },
};
