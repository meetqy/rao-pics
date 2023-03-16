/**
 * @type {import('next').NextConfig}
 */

const { PROTOCOL, HOSTNAME, PORT } = process.env;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },

  async redirects() {
    if (process.env.NODE_ENV === "production") return [];

    return [
      {
        source: "/api/:slug",
        destination: `${PROTOCOL}://${HOSTNAME}:${PORT}/api/:slug`,
        permanent: true,
      },
      {
        source: "/public/:slug*",
        destination: `${PROTOCOL}://${HOSTNAME}:${PORT}/public/:slug*`,
        permanent: true,
      },
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns:
      process.env.NODE_ENV === "production"
        ? []
        : [
            {
              protocol: PROTOCOL,
              hostname: HOSTNAME,
              port: PORT,
              pathname: "/public/**",
            },
          ],
  },
};

export default nextConfig;
