/**
 * @type {import('next').NextConfig}
 */

import { ensureSymlinkSync } from "fs-extra";
import { logger } from "./logger.mjs";
import { join } from "path";

ensureSymlinkSync(join(process.env.LIBRARY, "./images"), "./public/library");
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
