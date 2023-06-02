import builder from "electron-builder";

import { config } from "./config.js";

const { name, version } = config;
const extraResources: builder.FileSet[] = [];

export const AppConfig: builder.Configuration = {
  productName: name,
  copyright: `Copyright © 2022-${new Date().getFullYear()} meetqy`,
  mac: {
    category: "public.app-category.photography",
    icon: "buildResources/icon.icns",
    darkModeSupport: true,
    target: {
      target: "dmg",
      // arch: ["x64", "arm64"],
    },
    extraResources: extraResources,
  },
  extraMetadata: { version },
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["main/dist/**", "preload/dist/**", "renderer/dist/**"],
  extraResources: [
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
  beforeBuild: async (context) => {
    console.log(context.platform.nodeName, context.arch);

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
    config: AppConfig,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
