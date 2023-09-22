const { resolve, join } = require("path");

const isTestBuilder = process.env.IS_TEST_BUILDER === "true";

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  appId: "com.rao-pics.app",
  productName: "Rao Pics",
  directories: {
    buildResources: "build",
  },
  icon: "resources/icon.icns",
  asar: !isTestBuilder,
  files: [
    "!**/.vscode/*",
    "!src/*",
    "!electron.vite.config.{js,ts,mjs,cjs}",
    "!{.eslintignore,.eslintrc.json,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md,tailwind.config.ts,postcss.config.cjs,electron-builder.cjs}",
    "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
    "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}",
    "!**/node_modules/@rao-pics/**",
    "!**/.turbo/*",
    "!**/node_modules/prisma/libquery_engine-*",
    "!**/node_modules/@prisma/engines/**",
    {
      from: resolve(__dirname, "../../node_modules/.prisma"),
      to: "node_modules/.prisma",
    },
  ],
  asarUnpack: ["resources/**/*"],
  afterSign: "build/notarize.js",
  mac: {
    entitlementsInherit: "build/entitlements.mac.plist",
    target: isTestBuilder ? "dir" : "dmg",
  },
  win: {
    target: isTestBuilder ? "dir" : { target: "nsis", arch: ["x64"] },
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
    ...copyTheme("tiga-basic"),
  ],
};

function copyTheme(name) {
  // 主题目录
  const project = join(__dirname, "../../", "themes", name);
  const to = `themes/${name}`;

  return [
    {
      from: join(project, ".next/standalone/node_modules"),
      to: `${to}/node_modules`,
    },
    {
      from: join(project, ".next/standalone/themes", name),
      to,
    },
    {
      from: join(project, "public"),
      to: `${to}/public`,
    },
    {
      from: join(project, ".next", "static"),
      to: `${to}/.next/static`,
    },
  ];
}

module.exports = options;
