/**
 * @type {import('next').NextConfig}
 */

import symlink from "./scripts/symlink.mjs";

symlink();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },
};

nextConfig.images = {
  unoptimized: true,
  minimumCacheTTL: nextConfig.serverRuntimeConfig.minimumCacheTTL,
};

export default nextConfig;
