import { PrismaClient } from "@prisma/client";
import * as fs from "fs-extra";

import { getCacheDir } from "@acme/util";

export * from "@prisma/client";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

const cacheDir = getCacheDir();

/**
 * 创建sqlite数据库
 * Dev => db-dev.sqlite
 */
export const createSqlite = (sqliteSrc: string) => {
  if (fs.pathExistsSync(`${cacheDir}/db.sqlite`)) return;

  fs.ensureDirSync(cacheDir);
  fs.copySync(sqliteSrc, `${cacheDir}/db.sqlite`, {
    overwrite: false,
  });
};

const env = process.env.NODE_ENV;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: env === "development" ? "file:./db.sqlite?connection_limit=1" : `file:${cacheDir}/db.sqlite?connection_limit=1`,
      },
    },
    log: env === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env === "development") globalForPrisma.prisma = prisma;
