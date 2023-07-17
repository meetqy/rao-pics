import builder, { Platform } from "electron-builder";
import fs from "fs-extra";

// 额外资源 在 files 中排除
const excludeFileDir = fs.readdirSync("../nextjs/.next/standalone/node_modules").map((item) => {
  return `!**/node_modules/${item}/**/*`;
});

const openSSL = process.env["OPENSSL_VERSION"];

const extraResources: builder.FileSet[] = [];

const AppConfig: builder.Configuration = {
  appId: "com.rao.pics",
  copyright: `Copyright © 2022-${new Date().getFullYear()} meetqy`,
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

  artifactName: "${productName}-${version}-${os}-${arch}-" + openSSL + ".${ext}",

  linux: {
    category: "Graphics",
    icon: "buildResources",
    target: {
      target: "deb",
      arch: ["x64"],
    },
    extraResources,
  },

  beforeBuild: async (context) => {
    extraResources.pop();

    extraResources.push({
      from: "../nextjs/.next/standalone",
      filter: ["**/*", "!**/.prisma/client/*.node", `**/.prisma/client/libquery_engine-debian-${openSSL}.so.node`],
    });

    return Promise.resolve(context);
  },
};

builder
  .build({
    targets: Platform.LINUX.createTarget(),
    config: AppConfig,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
