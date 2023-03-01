import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      // 是否将源码里的 .d.ts 文件复制到 outputDir
      copyDtsFiles: true,
      // 是否跳过类型诊断
      skipDiagnostics: true,
      // 是否生成类型声明入口
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "@eagleuse/prisma-client",
      fileName: "index",
      formats: ["cjs"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["prisma", "@prisma/client"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          prisma: "prisma",
          "@prisma/client": "PrismaClient",
        },
      },
    },
  },
});
