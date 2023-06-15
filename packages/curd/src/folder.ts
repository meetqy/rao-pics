import { z } from "zod";

import { type PrismaClient } from "@acme/db";

export const FolderInput = {
  get: z.object({
    /** library name or id */
    library: z.union([z.string(), z.number()]),
  }),
  upsert: z.object({
    id: z.string(),
    name: z.string(),
    libraryId: z.number(),
  }),
  delete: z.object({
    libraryId: z.number(),
    /** folder ids */
    ids: z.array(z.string()),
    idsRule: z.enum(["in", "notIn"]).optional(),
  }),
  clear: z.object({
    libraryId: z.number(),
  }),
};

export function Folder(this: PrismaClient) {
  const _ = {
    /**
     * 根据 library id/name 获取文件夹
     */
    get: (obj: z.infer<(typeof FolderInput)["get"]>) => {
      const { library } = obj;

      return this.folder.findMany({
        where: {
          OR: [{ libraryId: typeof library === "number" ? library : undefined }, { library: { name: library.toString() } }],
        },

        include: {
          images: {
            take: 1,
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
        id: obj.id,
        name: obj.name,
        library: { connect: { id: obj.libraryId } },
      };

      return this.folder.upsert({
        where: { id: obj.id },
        update: input,
        create: input,
      });
    },

    /**
     * 删除 libraryId 下的文件夹
     */
    delete: (obj: z.infer<(typeof FolderInput)["delete"]>) => {
      return this.folder.deleteMany({
        where: {
          libraryId: obj.libraryId,
          id: {
            [obj.idsRule || "in"]: obj.ids,
          },
        },
      });
    },

    /**
     * 根据 libraryId 清空所有文件夹，不传清空所有
     */
    clear: (obj?: z.infer<(typeof FolderInput)["clear"]>) => {
      if (!obj) {
        return this.folder.deleteMany({});
      }

      return _.delete({
        libraryId: obj.libraryId,
        ids: [],
        idsRule: "notIn",
      });
    },
  };

  return _;
}
