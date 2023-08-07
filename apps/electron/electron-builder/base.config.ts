import fs from "fs-extra";

// 额外资源 在 files 中排除
const excludeFileDir = fs.readdirSync("../nextjs/.next/standalone/node_modules").map((item) => {
  return `!**/node_modules/${item}/**/*`;
});

export const baseConfig = (outputName: string) => ({
  appId: "com.rao.pics",
  copyright: `Copyright © 2022-${new Date().getFullYear()} meetqy`,
  asar: process.env.NODE_ENV === "development" ? false : true,
  directories: {
    output: "dist/" + outputName,
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
    /**
     * sentry 相关
     */
    ...["@sentry/electron", "@sentry/node", "https-proxy-agent", "debug", "agent-base", "lru_map", "cookie"].map((item) => ({
      from: `../../node_modules/${item}`,
      to: `node_modules/${item}`,
    })),
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
});
