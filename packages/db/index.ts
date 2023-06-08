import { homedir } from "os";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs-extra";

export * from "@prisma/client";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

const cacheDir = `${homedir()}/Library/Caches/Rao Pics`;

/**
 * 创建sqlite数据库
 * Dev => db-dev.sqlite
 * mac: ~/Library/Caches/{App Name}/db.sqlite
 */
export const createSqlite = (sqliteSrc: string) => {
  if (fs.pathExistsSync(`${cacheDir}/db.sqlite`)) return;

  if (process.platform === "darwin") {
    fs.ensureDirSync(cacheDir);
    fs.copySync(sqliteSrc, `${cacheDir}/db.sqlite`, {
      overwrite: false,
    });
  }
};

const env = process.env.NODE_ENV;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: env === "development" ? "file:./db.sqlite" : `file:${cacheDir}/db.sqlite?connection_limit=1`,
      },
    },
    log: env === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env === "development") globalForPrisma.prisma = prisma;
