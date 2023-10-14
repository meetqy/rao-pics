import { sep } from "path";
import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";

import { DB_DIRS, IS_DEV, PLATFORM } from "@rao-pics/constant/server";

const dbPath = DB_DIRS[PLATFORM];

const _prisma: PrismaClient = new PrismaClient(
  !IS_DEV
    ? {
        datasources: {
          db: { url: `file:${dbPath}` },
        },
      }
    : undefined,
);

/**
 * 创建 Db 目录， 如果不存在
 * @param defaultPath ...db.sqlite
 */
export const createDbPath = async (defaultPath: string) => {
  if (!fs.existsSync(defaultPath)) {
    throw new Error(`defaultPath: ${defaultPath} not exist`);
  }

  if (!fs.pathExistsSync(dbPath)) {
    fs.ensureDirSync(dbPath.split(sep).slice(0, -1).join(sep));
    fs.copySync(defaultPath, dbPath, {
      overwrite: false,
    });

    return;
  }

  return await migrate();
};

export const migrate = async () => {
  return await prisma.$transaction([
    prisma.$executeRaw`ALTER TABLE "Config" ADD COLUMN "pwdFolder" BOOLEAN DEFAULT false;`,
    prisma.$executeRaw`ALTER TABLE "Config" ADD COLUMN "trash" BOOLEAN DEFAULT false;`,
  ]);
};

export * from "@prisma/client";
export const prisma = _prisma;
