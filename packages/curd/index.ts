import { prisma, type PrismaClient } from "@acme/db";

import { Config, ConfigInput } from "./src/config";
import { Folder, FolderInput } from "./src/folder";
import { Tag, TagInput } from "./src/tag";

export const ZodInput = {
  folder: FolderInput,
  tag: TagInput,
  config: ConfigInput,
};

/**
 * Curd 操作函数
 * 思路：https://github.com/rao-pics/core/issues/217
 * @param prisma
 */
export function Curd(customPrisma?: PrismaClient) {
  if (!customPrisma) customPrisma = prisma;

  return {
    folder: Folder.bind(customPrisma),
    tag: Tag.bind(customPrisma),
    config: Config.bind(customPrisma),
  };
}

const curd = {
  folder: Folder.bind(prisma)(),
  tag: Tag.bind(prisma)(),
  config: Config.bind(prisma)(),
};

export default curd;
