import builder from "electron-builder";

if (process.env["VITE_APP_VERSION"] === undefined) {
  const now = new Date();
  process.env["VITE_APP_VERSION"] = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

const config: builder.Configuration = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  productName: "Rao Pics",
  files: ["main/dist/**", "preload/dist/**", "renderer/dist/**"],
  extraMetadata: {
    version: process.env["VITE_APP_VERSION"],
  },
  extraResources: [
    {
      from: "../../packages/db/prisma/db.sqlite",
      to: "packages/db/prisma/db.sqlite",
    },
    // {
    //   from: "../../node_modules/.prisma",
    //   to: "node_modules/.prisma",
    // },
    // {
    //   from: "../../node_modules/@prisma/client",
    //   to: "node_modules/@prisma/client",
    //   filter: ["**/*", "!node_modules"],
    // },
    {
      from: "../nextjs/.next/standalone",
      filter: ["**/*"],
    },
    {
      from: "../nextjs/.next/static",
      to: "apps/nextjs/.next/static",
      filter: ["**/*"],
    },
  ],
};

builder
  .build({
    config,
    dir: true,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
