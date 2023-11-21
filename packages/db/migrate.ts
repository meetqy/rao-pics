import { join } from "path";
import fs from "fs-extra";

import { DB_MIGRATION_VERSION_FILE, IS_DEV } from "@rao-pics/constant/server";
import { RLogger } from "@rao-pics/rlog";

import type { prisma } from ".";

const diffMigrate = async (migratesPath: string, file: string) => {
  const dirs = fs.readdirSync(migratesPath);
  const latestVersion = dirs[dirs.length - 2];

  if (!latestVersion) return;

  // 不存在 .version 文件，分 2 种情况
  // 1. 首次安装，无需执行迁移
  // 2. 之前安装的版本中没有 .version 文件，需要执行迁移
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, latestVersion);
    return runSql(migratesPath, latestVersion, file);
  }

  if (!latestVersion) return;
  const oldVersion = fs.readFileSync(file, "utf-8");

  if (oldVersion === latestVersion) return;

  return await runSql(migratesPath, latestVersion, file);
};

const runSql = async (
  migratesPath: string,
  latestVersion: string,
  file: string,
) => {
  const path = join(migratesPath, latestVersion, "migration.sql");

  if (!fs.existsSync(path)) {
    RLogger.info(`migrate: ${path} not exists`);
    return;
  }

  const sqls = fs
    .readFileSync(join(migratesPath, latestVersion, "migration.sql"), "utf-8")
    .split(";\n")
    .map((sql) => sql.replace(/(\n)?--.*?\n/, ""))
    .filter(Boolean)
    .map(
      (sql) =>
        eval(`prisma.$executeRaw\`${sql};\``) as ReturnType<
          typeof prisma.$executeRaw
        >,
    );

  fs.writeFileSync(file, latestVersion);

  for (const sql of sqls) {
    try {
      await sql;
    } catch (e) {
      console.error(e);
    }
  }
};

// TODO: 跨多个版本的迁移，暂未实现
/**
 * 迁移
 * @param appMigrationsPath 打包后的 miggrations 目录
 * @returns
 */
export const migrate = async (appMigrationsPath?: string) => {
  try {
    if (IS_DEV) {
      const migratesPath = join(
        __dirname,
        "../../../../",
        "packages",
        "db",
        "prisma",
        "migrations",
      );

      return await diffMigrate(migratesPath, join(migratesPath, ".version"));
    } else {
      if (appMigrationsPath) {
        return await diffMigrate(appMigrationsPath, DB_MIGRATION_VERSION_FILE);
      }

      throw new Error("migrate error: appMigrationsPath is undefined");
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("duplicate column name")) {
        return console.error("migrate error: ", e.message);
      }

      throw e;
    }
  }
};
