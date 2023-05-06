import { join } from "path";
import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

let prisma: PrismaClient;
let dbUrl;

export const getPrisma = (library?: string) => {
  if (!library && !dbUrl) throw Error("[prisma-client] library is null!");

  if (!dbUrl) {
    dbUrl = join(library, "./raopics.db");
  }

  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${dbUrl}?connection_limit=1`,
        },
      },
    });
  }

  return prisma;
};
