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
export const createDbPath = (defaultPath: string) => {
  if (!fs.existsSync(defaultPath)) {
    throw new Error(`defaultPath: ${defaultPath} not exist`);
  }

  if (fs.pathExistsSync(dbPath)) return;

  fs.ensureDirSync(dbPath.split(sep).slice(0, -1).join(sep));
  fs.copySync(defaultPath, dbPath, {
    overwrite: false,
  });
};

export * from "@prisma/client";
export const prisma = _prisma;
