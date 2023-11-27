const BaseConfig = require("./base.cjs");
const builder = require("electron-builder");
const { join } = require("path");

const { Platform } = builder;

const isTestBuilder = process.env.IS_TEST_BUILDER === "true";

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const AppConfig = {
  ...BaseConfig,

  win: {
    target: {
      target: isTestBuilder ? "dir" : "nsis",
      arch: ["x64"],
    },
    files: [
      {
        from: join(__dirname, "../../../node_modules/.prisma"),
        to: "node_modules/.prisma",
        filter: ["**/*", "!**/*.node", "**/query_engine-windows.dll.node"],
      },
    ],
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
