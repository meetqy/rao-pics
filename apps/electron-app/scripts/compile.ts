import builder from "electron-builder";

if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date();
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${
    now.getUTCMonth() + 1
  }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

const config: builder.Configuration = {
  directories: {
    output: "dist",
    buildResources: "buildResources",
  },
  files: ["main/dist/**", "preload/dist/**", "renderer/dist/**"],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  extraResources: [
    "buildResources/db.sqlite",
    "node_modules/.prisma/**/*",
    "node_modules/@prisma/client/**/*",
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
