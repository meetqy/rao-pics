/**
 * @type {import('next').NextConfig}
 */

import extra from "fs-extra";
import { logger } from "./logger.mjs";
const { ensureSymlinkSync, existsSync } = extra;

const library = "./public/library";
/**
 * ensureSymlinkSync centos7 报错
 * Error: EEXIST: file already exists, symlink
 * */
if (!existsSync(library)) {
  // 创建 library 软连接
  ensureSymlinkSync(process.env.LIBRARY + "/images");
  logger.info("library 软链接创建成功！");
} else {
  logger.info("library 软链接已创建，跳过。");
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
