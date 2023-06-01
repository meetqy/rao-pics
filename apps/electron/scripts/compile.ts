import builder from "electron-builder";

builder
  .build({
    targets: builder.Platform.MAC.createTarget(),
    config: {
      productName: "Rao Pics",
      copyright: `Copyright © 2022-${new Date().getFullYear()} meetqy`,
      asar: false,
      mac: {
        category: "public.app-category.photography",
        icon: "buildResources/icon.icns",
        darkModeSupport: true,
        target: {
          target: "dmg",
          arch: ["arm64", "x64"],
        },
      },
      extraMetadata: { version: "0.5.0-beta.2" },
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
          from: "../nextjs/.next/standalone",
          filter: ["**/*"],
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
    },
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
