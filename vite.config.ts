import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    coverage: {
      all: false,
    },
  },
});
