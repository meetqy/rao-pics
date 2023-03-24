import { PrismaClient } from "@prisma/client";
import _ from "lodash";
export * from "@prisma/client";
import chokidar from "chokidar";
import { logger } from "@raopics/utils";
import { join } from "path";
import { copySync } from "fs-extra";

let prisma: PrismaClient;
let watchDBFile = false;
let dbUrl;

const updatePrismaClient = _.debounce(() => {
  prisma.$disconnect();
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbUrl}?connection_limit=1`,
      },
    },
  });
  logger.info("[prisma-client] update prisma.");
}, 5000);

export const getPrisma = (library?: string) => {
  if (!library && !dbUrl) throw Error("[prisma-client] library is null!");

  if (!dbUrl) {
    dbUrl = join(library, "./raopics.db");
  }

  copySync(join(__dirname, "../prisma/default.db"), dbUrl, { overwrite: false });

  if (!watchDBFile) {
    chokidar
      .watch(dbUrl)
      .on("all", updatePrismaClient)
      .on("ready", () => {
        logger.info(`[prisma-client] start watching ${dbUrl}`);
      });

    watchDBFile = true;
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
