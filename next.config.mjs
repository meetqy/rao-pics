/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    transpilePackages: [
      "swagger-ui-react",
      "swagger-client",
      "react-syntax-highlighter",
    ],
  },
};

export default nextConfig;
