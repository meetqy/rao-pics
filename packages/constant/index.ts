import env from "env-var";

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
