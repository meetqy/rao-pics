const { resolve } = require("path");

const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  appId: "com.electron.app",
  productName: "electron",
  directories: {
    buildResources: "build",
  },
  asar: !isDev,
  files: [
    "!**/.vscode/*",
    "!src/*",
    "!electron.vite.config.{js,ts,mjs,cjs}",
    "!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}",
    "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
    "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}",
    "!**/node_modules/@rao-pics/**/*",
    {
      from: resolve(__dirname, "../../node_modules/.prisma"),
      to: "node_modules/.prisma",
    },
  ],
  asarUnpack: ["resources/**/*"],
  afterSign: "build/notarize.js",
  mac: {
    entitlementsInherit: "build/entitlements.mac.plist",
    target: isDev ? "dir" : { target: "dmg", arch: ["arm64", "x64"] },
  },
  npmRebuild: false,
  publish: {
    provider: "generic",
    url: "https://example.com/auto-updates",
  },
  extraResources: [
    {
      from: resolve(__dirname, "./node_modules/@rao-pics/db/prisma/db.sqlite"),
      to: "extraResources/db.sqlite",
    },
  ],
};

module.exports = options;
