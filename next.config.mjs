/**
 * @type {import('next').NextConfig}
 */

import symlink from "./scripts/symlink.mjs";

symlink();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
