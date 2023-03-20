import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "@raopics/utils",
      fileName: "index",
      formats: ["cjs"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["pino", "pino-pretty"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          pino: "pino",
          "pino-pretty": "pretty",
        },
      },
    },
  },
});
