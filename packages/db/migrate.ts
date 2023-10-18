import { join } from "path";
import fs from "fs-extra";

import { DB_MIGRATION_VERSION_FILE, IS_DEV } from "@rao-pics/constant/server";

import { prisma } from ".";

const diffMigrate = async (migratesPath: string, file: string) => {
  const dirs = fs.readdirSync(migratesPath);
  const latestVersion = dirs[dirs.length - 2];

  // 不存在 .version 文件，设置为当前的版本
  if (!fs.existsSync(file)) {
    latestVersion && fs.writeFileSync(file, latestVersion);

    return;
  }

  if (!latestVersion) return;
  const oldVersion = fs.readFileSync(file, "utf-8");

  if (oldVersion === latestVersion) return;

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
  return await prisma.$transaction(sqls);
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
