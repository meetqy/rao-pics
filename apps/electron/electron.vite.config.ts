import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        exclude: [
          "@rao-pics/db",
          "@rao-pics/api",
          "@rao-pics/constant",
          // type:module 的依赖，electron 中需要打包到代码中
          "get-port",
          "plaiceholder",
        ],
        include: [
          // @rao-pics/api 中的依赖，electron 中作为外部依赖
          "chokidar",
          "sharp",
        ],
      }),
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
