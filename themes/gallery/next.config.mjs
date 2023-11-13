import "./src/env.mjs";

if (process.env.NODE_ENV === "development") {
  process.env.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = "false";
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@rao-pics/api", "@rao-pics/utils"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default config;
