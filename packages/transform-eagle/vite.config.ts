import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "@eagleuse-transform-eagle",
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "@prisma/client",
        "chokidar",
        "fs-extra",
        "lodash",
        "prisma",
        "path",
        "dotenv",
        "progress",
        "@eagleuse/utils",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "@prisma/client": "PrismaClient",
          chokidar: "chokidar",
          "fs-extra": "fs",
          lodash: "_",
          prisma: "prisma",
          path: "path",
          dotenv: "dotenv",
          progress: "ProgressBar",
          "@eagleuse/utils": "Utils",
        },
      },
    },
  },
});
