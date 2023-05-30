import builder from "electron-builder";

const config: builder.Configuration = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  productName: "RaoPics",
  files: ["main/dist/**", "preload/dist/**", "renderer/dist/**"],
  extraMetadata: {
    version: "0.5.0-beta.1",
  },
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
};

builder
  .build({
    win: ["nsis"],
    mac: ["dmg"],
    config,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
