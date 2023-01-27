/**
 * @type {import('next').NextConfig}
 */

import fs from "fs-extra";

import { logger } from "./logger.mjs";
import { join } from "path";
const { ensureSymlinkSync, existsSync } = fs;

const library = "./public/library";
if (existsSync(library)) {
  logger.info("library 软链接已创建，跳过。");
} else {
  ensureSymlinkSync(join(process.env.LIBRARY, "./images"), library);
  logger.info("library 软链接创建成功！");
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
