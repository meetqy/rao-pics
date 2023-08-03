import builder, { Platform } from "electron-builder";

import { baseConfig } from "./base.config.js";

const extraResources: builder.FileSet[] = [];

const AppConfig: builder.Configuration = {
  ...baseConfig("win"),

  win: {
    icon: "buildResources",
    target: process.env.NODE_ENV === "development" ? "dir" : { target: "nsis", arch: ["x64"] },
    extraResources,
  },

  beforeBuild: async (context) => {
    extraResources.pop();

    extraResources.push({
      from: "../nextjs/.next/standalone",
      filter: ["**/*", "!**/.prisma/client/*.node", `**/.prisma/client/*-windows.dll.node`],
    });

    return Promise.resolve(context);
  },
};

builder
  .build({
    targets: Platform.WINDOWS.createTarget(),
    config: AppConfig,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
