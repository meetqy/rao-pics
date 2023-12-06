import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*",
  {
    extends: "./vite.config.ts",
  },
]);
