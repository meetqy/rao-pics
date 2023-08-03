import builder, { Platform } from "electron-builder";

import { baseConfig } from "./base.config.js";

const openSSL = process.env["OPENSSL_VERSION"] || "openssl-1.1.x";

const extraResources: builder.FileSet[] = [];

const AppConfig: builder.Configuration = {
  ...baseConfig("linux-" + openSSL),

  linux: {
    artifactName: "${productName}-${version}-${os}-${arch}-" + openSSL + ".${ext}",
    category: "Graphics",
    icon: "buildResources",
    target:
      process.env.NODE_ENV === "development"
        ? "dir"
        : {
            target: "deb",
            arch: ["x64", "arm64"],
          },
    extraResources,
  },

  beforeBuild: async (context) => {
    extraResources.pop();

    extraResources.push({
      from: "../nextjs/.next/standalone",
      filter: [
        "**/*",
        "!**/.prisma/client/*.node",
        context.arch === "arm64" ? `**/.prisma/client/libquery_engine-linux-arm64-${openSSL}.so.node` : `**/.prisma/client/libquery_engine-debian-${openSSL}.so.node`,
      ],
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
