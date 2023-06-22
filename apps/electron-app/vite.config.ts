import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

export default defineConfig({
  mode: "development",
  plugins: [
    react(),
    electron([
      {
        entry: "electron/index.ts",
      },
      {
        entry: "preload/preload.ts",
        onstart(options) {
          options.reload();
        },
      },
    ]),
  ],
});
