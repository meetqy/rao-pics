/**
 * @type {import('next').NextConfig}
 */
import "./scripts/symlink.mjs";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
