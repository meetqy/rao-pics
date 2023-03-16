/**
 * @type {import('next').NextConfig}
 */

const { PROTOCOL, HOSTNAME, PORT } = process.env;
console.log(PROTOCOL, HOSTNAME, PORT);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  serverRuntimeConfig: {
    minimumCacheTTL: 3600 * 24 * 365,
  },

  async redirects() {
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
    remotePatterns: [
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
