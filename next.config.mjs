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

  async rewrites() {
    return [
      {
        source: "/api/image/:path*",
        destination: "http://localhost:3002/:path*",
      },
    ];
  },
};

nextConfig.images = {
  unoptimized: true,
  minimumCacheTTL: nextConfig.serverRuntimeConfig.minimumCacheTTL,
};

export default nextConfig;
