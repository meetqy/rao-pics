import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      // 是否跳过类型诊断
      skipDiagnostics: true,
    }),
  ],
  build: {
    lib: {
      entry: "lib/index.ts",
      name: "@eagleuse/plugin-nsfw",
      fileName: "index",
      formats: ["cjs"],
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["@tensorflow/tfjs-node", "nsfwjs", "path", "fs-extra"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          "fs-extra": "fs",
          path: "path",
          nsfwjs: "nsfw",
          "@tensorflow/tfjs-node": "tf",
        },
      },
    },
  },
});
