import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        exclude: ["@rao-pics/db", "@rao-pics/api", "@rao-pics/constant"],
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
