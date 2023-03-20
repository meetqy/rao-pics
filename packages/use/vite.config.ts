import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      // 是否跳过类型诊断
      skipDiagnostics: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    target: "es2020",
    lib: {
      entry: "lib/index.ts",
      name: "EagleUse",
      fileName: (_format, name) => {
        if (name.endsWith("start")) {
          return "start.js";
        }

        return name + ".js";
      },
      formats: ["cjs"],
    },
    sourcemap: "inline",
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "dotenv-flow",
        "@raopics/plugin-nsfw",
        "@raopics/prisma-client",
        "@raopics/transform-eagle",
        "@raopics/plugin-api",
        "path",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "@raopics/plugin-nsfw": "NSFW",
          "@raopics/prisma-client": "PrismaClient",
          "@raopics/transform-eagle": "TransformEagle",
          "@raopics/plugin-api": "API",
          "dotenv-flow": "dotenv",
          path: "path",
        },
      },
    },
  },
});
