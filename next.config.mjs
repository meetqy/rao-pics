/**
 * @type {import('next').NextConfig}
 */

import { ensureSymlinkSync } from "fs-extra";
import { logger } from "./logger.mjs";

// 创建 library 软连接
ensureSymlinkSync(process.env.LIBRARY + "/images", "./public/library");
logger.info("library 软链接创建成功！");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
