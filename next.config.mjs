/**
 * @type {import('next').NextConfig}
 */

const { PLUGIN_API_HOST, PLUGIN_API_PORT } = process.env;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },

  publicRuntimeConfig: {
    // 菜单是否显示回收站
    showTrash: process.env.SHOW_TRASH === "true",
    PLUGIN_API_HOST: PLUGIN_API_HOST + PLUGIN_API_PORT,
  },

  async rewrites() {
    return [
      {
        source: "/api/image/:path*",
        destination: `${this.publicRuntimeConfig.PLUGIN_API_HOST}/:path*`,
      },
    ];
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
