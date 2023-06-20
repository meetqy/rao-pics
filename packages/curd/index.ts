import { type PrismaClient } from "@acme/db";

import { Folder, FolderInput } from "./src/folder";
import { Tag, TagInput } from "./src/tag";

export const ZodInput = {
  folder: FolderInput,
  tag: TagInput,
};

/**
 * Curd 操作函数
 * 思路：https://github.com/rao-pics/core/issues/217
 * @param prisma
 */
export function Curd(prisma: PrismaClient) {
  return {
    folder: Folder.bind(prisma),
    tag: Tag.bind(prisma),
  };
}
