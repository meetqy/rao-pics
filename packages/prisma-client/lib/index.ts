import { PrismaClient } from "@prisma/client";
import _ from "lodash";
export * from "@prisma/client";
import chokidar from "chokidar";
import { logger } from "@raopics/utils";
import { join } from "path";

let prisma: PrismaClient;
let watchDBFile = false;

const updatePrismaClient = _.debounce(() => {
  prisma.$disconnect();
  prisma = new PrismaClient();
  logger.info("[prisma-client] update prisma.");
}, 5000);

export const getPrisma = () => {
  const { LIBRARY } = process.env;
  if (LIBRARY && !watchDBFile) {
    const dbFile = join(LIBRARY, "./raopics.db?connection_limit=1");

    chokidar
      .watch(dbFile)
      .on("all", updatePrismaClient)
      .on("ready", () => {
        logger.info(`[prisma-client] start watching ${dbFile}`);
      });

    watchDBFile = true;
  }

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};
