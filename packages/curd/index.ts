import { type PrismaClient } from "@acme/db";

import { Folder, FolderInput } from "./src/folder";

export const ZodInput = {
  folder: FolderInput,
};

export function Curd(prisma: PrismaClient) {
  return {
    folder: Folder.bind(prisma),
  };
}
