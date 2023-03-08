/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },

  publicRuntimeConfig: {
    // 菜单是否显示回收站
    showTrash: process.env.SHOW_TRASH === "true",
  },

  async redirects() {
    return [
      {
        source: "/api/:slug",
        destination: "http://localhost:9623/api/:slug",
        permanent: true,
      },
      {
        source: "/public/:slug*",
        destination: "http://localhost:9623/public/:slug*",
        permanent: true,
      },
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9623",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
