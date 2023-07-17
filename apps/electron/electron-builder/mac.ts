import builder, { Platform } from "electron-builder";
import fs from "fs-extra";

// 额外资源 在 files 中排除
const excludeFileDir = fs.readdirSync("../nextjs/.next/standalone/node_modules").map((item) => {
  return `!**/node_modules/${item}/**/*`;
});

const extraResources: builder.FileSet[] = [];

const AppConfig: builder.Configuration = {
  copyright: `Copyright © 2022-${new Date().getFullYear()} rao.pics`,
  asar: true,
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: [
    "main/dist/**",
    "preload/dist/**",
    "renderer/dist/**",
    // 排除 @acme 已经打包到 {main|preload|renderer}/dist 中
    // TODO: 循环嵌套的 @acme/{db|api|eagle} 无法排除
    "!**/node_modules/@acme/**/*",
  ].concat(excludeFileDir),
  extraResources: [
    {
      from: "./buildResources",
      to: "buildResources",
    },
    {
      from: "../../packages/db/prisma/db.sqlite",
      to: "packages/db/prisma/db.sqlite",
    },
    {
      from: "../nextjs/.next/static",
      to: "apps/nextjs/.next/static",
      filter: ["**/*"],
    },
    {
      from: "../nextjs/public",
      to: "apps/nextjs/public",
      filter: ["**/*"],
    },
  ],

  mac: {
    identity: null,
    category: "public.app-category.share-photos",
    icon: "buildResources",
    darkModeSupport: true,
    target: { target: "dmg", arch: ["arm64", "x64", "universal"] },
    extraResources,
  },

  beforeBuild: async (context) => {
    extraResources.pop();

    extraResources.push({
      from: "../nextjs/.next/standalone",
      filter: ["**/*", "!**/.prisma/client/*.node", `**/.prisma/client/*darwin${context.arch === "x64" ? "" : "-arm64"}.*.node`],
    });

    return Promise.resolve(context);
  },
};

builder
  .build({
    targets: Platform.MAC.createTarget(),
    config: AppConfig,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
