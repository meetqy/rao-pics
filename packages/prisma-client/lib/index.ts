import _ from "lodash";
import chokidar from "chokidar";
import { logger } from "@raopics/utils";
import { join } from "path";
import { copySync } from "fs-extra";
import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

let prisma: PrismaClient;
let dbUrl;

export const getPrisma = (library?: string) => {
  if (!library && !dbUrl) throw Error("[prisma-client] library is null!");

  if (!dbUrl) {
    dbUrl = join(library, "./raopics.db");
  }

  copySync(join(__dirname, "../prisma/default.db"), dbUrl, { overwrite: false });

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
