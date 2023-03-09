import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      // 是否跳过类型诊断
      skipDiagnostics: true,
      // 是否生成类型声明入口
      insertTypesEntry: true,
    }),
  ],
  build: {
    target: "es2020",
    lib: {
      entry: "lib/index.ts",
      name: "TransformEagle",
      fileName: "index",
      formats: ["cjs"],
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "chokidar",
        "fs-extra",
        "lodash",
        "path",
        "progress",
        "@eagleuse/utils",
        "@eagleuse/plugin-nsfw",
        "@eagleuse/prisma-client",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          chokidar: "chokidar",
          "fs-extra": "fs",
          lodash: "_",
          path: "path",
          progress: "ProgressBar",
          "@eagleuse/utils": "Utils",
          "@eagleuse/plugin-nsfw": "NSFW",
          "@eagleuse/prisma-client": "PrismaClient",
        },
      },
    },
  },
});
