/**
 * @type {import('next').NextConfig}
 */

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
