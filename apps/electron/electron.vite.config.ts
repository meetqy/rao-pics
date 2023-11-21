import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
// import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";

// const IS_DEV = process.env.NODE_ENV === "development";
// const IS_TEST_BUILDER = process.env.IS_TEST_BUILDER === "true";

export default defineConfig({
  main: {
    build: {
      sourcemap: process.env.NODE_ENV === "production" ? true : "inline",
    },
    plugins: [
      externalizeDepsPlugin({
        exclude: [
          "@rao-pics/db",
          "@rao-pics/api",
          "@rao-pics/constant",
          "@rao-pics/trpc",
          "@rao-pics/rlog",

          // package.json => type:module 的依赖，electron 中需要打包到代码中
          "superjson",
        ],
        include: [
          // @rao-pics/api 中的依赖，electron 中作为外部依赖
          "chokidar",
        ],
      }),

      // !IS_DEV &&
      //   !IS_TEST_BUILDER &&
      //   sentryVitePlugin({
      //     org: "meetqy",
      //     project: "rao-pics",
      //     // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      //     // and need `project:releases` and `org:read` scopes
      //     authToken:
      //       "7979f62cdaee7ba46204863b5777bec04eed627ccb7a2c5d32262ad3a04672e7",
      //   }),
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@build": resolve("build"),
      },
    },
    plugins: [react()],
  },
});
