import { z } from "zod";

import { prisma, type Prisma } from "@acme/db";

export const FolderInput = {
  get: z.object({
    libraryId: z.number().optional(),
    id: z.string().optional(),
  }),
  upsert: z.object({
    folderId: z.string(),
    name: z.string(),
    libraryId: z.number(),
  }),
  delete: z
    .object({
      libraryId: z.number(),
      id: z.string(),
    })
    .partial()
    .refine((v) => v.libraryId || v.id, { message: "libraryId or id is required" }),
};

export const Folder = {
  get: (obj: z.infer<(typeof FolderInput)["get"]>) => {
    const input = FolderInput.get.parse(obj);
    const { libraryId, id } = input;

    const where: Prisma.FolderWhereInput = {};

    if (libraryId) {
      where.libraryId = libraryId;
    }

    if (id) {
      where.id = id;
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
    const input = {
      id: obj.folderId,
      name: obj.name,
      library: { connect: { id: obj.libraryId } },
    };

    return prisma.folder.upsert({
      where: { id: obj.folderId },
      update: input,
      create: input,
    });
  },

  delete: (obj: z.infer<(typeof FolderInput)["delete"]>) => {
    const input = FolderInput.delete.parse(obj);

    return prisma.folder.deleteMany({
      where: {
        libraryId: input.libraryId,
        id: input.id,
      },
    });
  },
};
