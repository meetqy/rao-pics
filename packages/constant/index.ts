import { homedir } from "os";
import { join } from "path";
import env from "env-var";

/**
 * 是否是开发环境
 */
export const IS_DEV = process.env.NODE_ENV === "development";

/**
 * 是否是测试环境
 */
export const IS_TEST = process.env.NODE_ENV === "test";

/**
 * 当前平台
 */
export const PLATFORM = process.platform;

/**
 * 项目名称
 */
export const PRODUCT_NAME = env
  .get("PRODUCT_NAME")
  .required()
  .default("Rao Pics")
  .asString();

/**
 * 数据库文件名称
 */
export const DB_NAME = env
  .get("DB_NAME")
  .required()
  .default(`db${IS_TEST ? "test" : ""}.sqlite`)
  .asString();

/**
 * @rao-pics/constants 中所有的目录必须调用此方法格式化
 * @param dir
 */
const formatDirPath = (dir: string) => {
  return dir.replace(/\s/g, "_");
};

/**
 * sqlite.db 存放目录，不同的系统存放目录不同
 */
export const DB_DIRS = {
  darwin: formatDirPath(
    join(homedir(), "Library", "Caches", PRODUCT_NAME, DB_NAME),
  ),
  win32: formatDirPath(
    join(homedir(), "AppData", "Local", PRODUCT_NAME, DB_NAME),
  ),
  linux: formatDirPath(join(homedir(), ".cache", PRODUCT_NAME, DB_NAME)),
} as { [key in NodeJS.Platform]: string };
