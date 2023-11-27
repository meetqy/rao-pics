const BaseConfig = require("./base.cjs");
const builder = require("electron-builder");
const { join } = require("path");

const { Platform } = builder;

const isTestBuilder = process.env.IS_TEST_BUILDER === "true";

const files = [];

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const AppConfig = {
  ...BaseConfig,

  mac: {
    identity: null,
    entitlementsInherit: "build/entitlements.mac.plist",
    category: "public.app-category.photography",
    darkModeSupport: true,
    target: {
      target: isTestBuilder ? "dir" : "dmg",
      arch: ["x64", "arm64"],
    },
    files,
  },

  beforeBuild: (context) => {
    files.splice(-1);

    if (context.arch === "x64") {
      files.push({
        from: join(__dirname, "../../../node_modules/.prisma"),
        to: "node_modules/.prisma",
        filter: ["**/*", "!**/*.node", "**/libquery_engine-darwin.dylib.node"],
      });
    }

    if (context.arch === "arm64") {
      files.push({
        from: join(__dirname, "../../../node_modules/.prisma"),
        to: "node_modules/.prisma",
        filter: [
          "**/*",
          "!**/*.node",
          "**/libquery_engine-darwin-arm64.dylib.node",
        ],
      });
    }

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
