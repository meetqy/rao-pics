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
    libraryId: z.number(),
    fileCount: z.number().optional(),
    failCount: z.number().optional(),
  }),

  delete: z.object({
    libraryId: z.number(),
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
      where: { id: obj.libraryId },
      data: {
        ...obj,
        lastSyncTime: new Date(),
      },
    });
  },

  delete: async (obj: z.infer<(typeof LibraryInput)["delete"]>) => {
    const { libraryId } = obj;
    await prisma.$transaction([
      prisma.image.deleteMany({
        where: { libraryId },
      }),
      curd.folder.clear({ libraryId }),
      curd.tag.clear({ libraryId }),
    ]);

    return prisma.library.delete({ where: { id: libraryId } });
  },
};
