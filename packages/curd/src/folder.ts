import { z } from "zod";

import { prisma, type Prisma } from "@acme/db";

export const FolderInput = {
  get: z.object({
    libraryId: z.number().optional(),
    imageId: z.number().optional(),
    id: z.string().optional(),
  }),
  upsert: z.object({
    id: z.string(),
    name: z.string(),
    libraryId: z.number(),
  }),
  delete: z
    .object({
      libraryId: z.number(),
      id: z.union([z.string(), z.array(z.string())]),
    })
    .partial()
    .refine((v) => v.libraryId || v.id, { message: "libraryId or id is required" }),
};

export const Folder = {
  get: (obj: z.infer<(typeof FolderInput)["get"]>) => {
    const input = FolderInput.get.parse(obj);

    const where: Prisma.FolderWhereInput = {};

    if (input.libraryId) {
      where.libraryId = input.libraryId;
    }

    if (input.id) {
      where.id = input.id;
    }

    if (input.imageId) {
      where.images = {
        some: { id: input.imageId },
      };
    }

    return prisma.folder.findMany({
      where,
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

  upsert: (obj: z.infer<(typeof FolderInput)["upsert"]>) => {
    const input = FolderInput.upsert.parse(obj);

    const _input = {
      id: obj.id,
      name: obj.name,
      library: { connect: { id: obj.libraryId } },
    };

    return prisma.folder.upsert({
      where: { id: input.id },
      update: _input,
      create: _input,
    });
  },

  delete: (obj: z.infer<(typeof FolderInput)["delete"]>) => {
    const input = FolderInput.delete.parse(obj);

    return prisma.folder.deleteMany({
      where: {
        libraryId: input.libraryId,
        id: {
          in: typeof input.id === "string" ? [input.id] : input.id,
        },
      },
    });
  },
};
