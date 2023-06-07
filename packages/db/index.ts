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

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${cacheDir}/db.sqlite?connection_limit=1`,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
