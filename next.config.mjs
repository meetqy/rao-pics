/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },

  publicRuntimeConfig: {
    // 菜单是否显示回收站
    showTrash: process.env.SHOW_TRASH === "true",
  },
};

nextConfig.images = {
  unoptimized: true,
  minimumCacheTTL: nextConfig.serverRuntimeConfig.minimumCacheTTL,
};

export default nextConfig;
