import { z } from "zod";

import { prisma } from "@acme/db";

export const FolderInput = {
  get: z.object({
    /** library name or id */
    library: z.union([z.string(), z.number()]),
  }),
  upsert: z.object({
    folderId: z.string(),
    name: z.string(),
    libraryId: z.number(),
  }),
  delete: z.object({
    libraryId: z.number(),
    /** folder ids */
    folderIds: z.array(z.string()),
    idsRule: z.enum(["in", "notIn"]).optional(),
  }),
  clear: z.object({
    libraryId: z.number(),
  }),
};

export const Folder = {
  /**
   * 根据 library id/name 获取文件夹
   */
  get: (obj: z.infer<(typeof FolderInput)["get"]>) => {
    const { library } = obj;

    return prisma.folder.findMany({
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

  /**
   * folder 存在则更新，反之创建
   */
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

  /**
   * 删除 libraryId 下的文件夹
   */
  delete: (obj: z.infer<(typeof FolderInput)["delete"]>) => {
    return prisma.folder.deleteMany({
      where: {
        libraryId: obj.libraryId,
        id: {
          [obj.idsRule || "in"]: obj.folderIds,
        },
      },
    });
  },

  /**
   * 根据 libraryId 清空所有文件夹，不传清空所有
   */
  clear: (obj?: z.infer<(typeof FolderInput)["clear"]>) => {
    if (!obj) {
      return prisma.folder.deleteMany({});
    }

    return Folder.delete({
      libraryId: obj.libraryId,
      folderIds: [],
      idsRule: "notIn",
    });
  },
};
