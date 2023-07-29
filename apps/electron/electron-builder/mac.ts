import builder, { Platform } from "electron-builder";

import { baseConfig } from "./base.config.js";

const extraResources: builder.FileSet[] = [];

const AppConfig: builder.Configuration = {
  ...baseConfig("mac"),

  mac: {
    identity: null,
    category: "public.app-category.share-photos",
    icon: "buildResources",
    darkModeSupport: true,
    target: process.env.NODE_ENV === "development" ? "dir" : { target: "dmg", arch: ["arm64", "x64"] },
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
