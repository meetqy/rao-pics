/**
 * @type {import('next').NextConfig}
 */

const { PROTOCOL, HOSTNAME, PORT } = process.env;

let host = `${PROTOCOL}://${HOSTNAME}`;

if (PORT) {
  host += `:${PORT}`;
}

console.log(host);

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
        source: "/api/:slug*",
        destination: `${host}/api/:slug*`,
        permanent: true,
      },
      {
        source: "/static/:slug*",
        destination: `${host}/static/:slug*`,
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
              pathname: "/static/**",
            },
          ],
  },
};

export default nextConfig;
