import env from "env-var";
import { z } from "zod";

/**
 * 项目名称
 */
export const PRODUCT_NAME = env
  .get("PRODUCT_NAME")
  .required()
  .default("Rao Pics")
  .asString();

/**
 * 语言
 */
export const LANGUAGE = {
  "zh-cn": "中文简体",
  "zh-tw": "中文繁体",
  "en-us": "English",
};

/**
 * pending type 枚举 Zod
 */
export const PendingTypeEnumZod = z.enum(["create", "update", "delete"]);

/**
 * pending type 枚举
 */
export type PendingTypeEnum = z.infer<typeof PendingTypeEnumZod>;

/**
 * Log type 枚举 Zod
 */

export const LogTypeEnumZod = z.enum([
  "json-error",
  "unsupported-ext",
  "unknow",
]);

/**
 * Log type 枚举
 */
export type LogTypeEnum = z.infer<typeof LogTypeEnumZod>;

/**
 * 支持的视频格式
 */
export const VIDEO_EXT = [
  "mp4",
  "avi",
  "mov",
  "wmv",
  "flv",
  "webm",
  "mkv",
] as const;

/**
 * 支持的图片格式
 */
export const IMG_EXT = [
  "jpg",
  "png",
  "jpeg",
  "gif",
  "webp",
  "bmp",
  "ico",
  "svg",
] as const;

export const EXT = [...VIDEO_EXT, ...IMG_EXT] as const;
