const { join } = require("path");

const isTestBuilder = process.env.IS_TEST_BUILDER === "true";

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const BaseConfig = {
  appId: "com.rao-pics.app",
  copyright: `Copyright © 2022 meetqy`,
  productName: "Rao Pics",
  directories: {
    buildResources: "build",
    output: "releases",
  },
  asar: !isTestBuilder,
  files: [
    "!**/.vscode/*",
    "!src/*",
    "!electron-builder",
    "!electron.vite.config.{js,ts,mjs,cjs}",
    "!{.eslintignore,.eslintrc.json,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md,tailwind.config.ts,postcss.config.cjs,electron-builder.cjs}",
    "!{.env,.env.*,.npmrc,pnpm-lock.yaml}",
    "!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}",
    "!**/node_modules/@rao-pics/**",
    "!**/.turbo/*",
    "!**/node_modules/prisma/libquery_engine-*",
    "!**/node_modules/@prisma/engines/**",
  ],
  extraResources: [
    {
      from: join(__dirname, "../node_modules/@rao-pics/db/prisma/db.sqlite"),
      to: "extraResources/db.sqlite",
    },
    ...copyTheme("gallery"),
  ],
};

function copyTheme(name) {
  // 主题目录
  const project = join(__dirname, "../../../", "themes", name);
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

module.exports = BaseConfig;
