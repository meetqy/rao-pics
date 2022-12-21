/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    transpilePackages: ["swagger-ui-react", "swagger-client"],
  },
};

export default nextConfig;
