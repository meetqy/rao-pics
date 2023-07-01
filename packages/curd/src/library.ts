import { z } from "zod";

import { prisma, type Prisma } from "@acme/db";

import curd from "..";

export const LibraryInput = {
  get: z
    .object({
      library: z.union([z.string(), z.number()]),
    })
    .optional(),

  create: z.object({
    name: z.string(),
    dir: z.string(),
    type: z.enum(["eagle", "pixcall", "billfish"]),
    fileCount: z.number().optional(),
    failCount: z.number().optional(),
  }),

  update: z.object({
    id: z.number(),
    fileCount: z.number().optional(),
    failCount: z.number().optional(),
  }),

  delete: z.object({
    id: z.number(),
  }),
};

export const Library = {
  get: (obj: z.infer<(typeof LibraryInput)["get"]>) => {
    let where: Prisma.LibraryWhereInput | undefined;

    if (obj) {
      const { library } = obj;

      where = {
        OR: [{ id: typeof library === "number" ? library : undefined }, { name: library.toString() }],
      };
    }

    return prisma.library.findMany({
      where,
      include: {
        _count: { select: { images: true } },
      },
    });
  },

  create: (obj: z.infer<(typeof LibraryInput)["create"]>) => {
    return prisma.library.create({
      data: obj,
    });
  },

  update: (obj: z.infer<(typeof LibraryInput)["update"]>) => {
    return prisma.library.update({
      where: { id: obj.id },
      data: {
        ...obj,
        lastSyncTime: new Date(),
      },
    });
  },

  delete: async (obj: z.infer<(typeof LibraryInput)["delete"]>) => {
    const { id } = obj;

    await prisma.$transaction([
      prisma.image.deleteMany({
        where: { id },
      }),
      curd.folder.delete({ libraryId: id }),
      curd.tag.clear({ libraryId: id }),
    ]);

    return prisma.library.delete({ where: { id } });
  },
};
