import { PrismaClient } from "@prisma/client";
import _ from "lodash";
export * from "@prisma/client";
import chokidar from "chokidar";
import { logger } from "@eagleuse/utils";

let prisma: PrismaClient;
let watchDBFile = false;

const updatePrismaClient = _.debounce(() => {
  prisma.$disconnect();
  prisma = new PrismaClient();
  logger.info("[prisma-client] update prisma.");
}, 5000);

export const getPrisma = () => {
  const { DATABASE_URL } = process.env;
  if (DATABASE_URL && !watchDBFile) {
    chokidar.watch(DATABASE_URL.replace("file:", "").split("db")[0] + "db").on("change", updatePrismaClient);

    watchDBFile = true;
  }

  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};
