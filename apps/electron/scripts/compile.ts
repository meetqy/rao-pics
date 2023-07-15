import builder from "electron-builder";
import fs from "fs-extra";

const { Platform } = builder;

const isTest = process.env["CSC_IDENTITY_AUTO_DISCOVERY"] === "false";

// 额外资源 在 files 中排除
const excludeFileDir = fs.readdirSync("../nextjs/.next/standalone/node_modules").map((item) => {
  return `!**/node_modules/${item}/**/*`;
});

console.log("excludeFileDir", excludeFileDir);

const extraResources: builder.FileSet[] = [];

export const AppConfig: builder.Configuration = {
  copyright: `Copyright © 2022-${new Date().getFullYear()} meetqy`,
  asar: isTest ? false : true,
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
    "!**/node_modules/@acme*/**/*",
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
    category: "public.app-category.photography",
    icon: "buildResources",
    darkModeSupport: true,
    target: isTest ? "dir" : { target: "dmg" },
    extraResources,
  },

  win: {
    icon: "buildResources",
    target: isTest ? "dir" : "nsis",
    extraResources,
  },

  beforeBuild: async (context) => {
    extraResources.pop();

    if (context.platform.name === "mac") {
      extraResources.push({
        from: "../nextjs/.next/standalone",
        filter: ["**/*", "!**/.prisma/client/*.node", `**/.prisma/client/*darwin${context.arch === "x64" ? "" : "-arm64"}.*.node`],
      });
    } else {
      extraResources.push({
        from: "../nextjs/.next/standalone",
        filter: ["**/*", "!**/.prisma/client/*.node", `**/.prisma/client/*${context.platform.name}*.node`],
      });
    }

    return Promise.resolve(context);
  },
};

const targets = new Map().set(Platform.WINDOWS, new Map()).set(Platform.MAC, new Map());

builder
  .build({
    targets,
    config: AppConfig,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
