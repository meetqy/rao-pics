import type { Config } from "tailwindcss";

import baseConfig from "@rao-pics/tailwind-config";

export default {
  content: ["./src/renderer/src/**/*.{ts,tsx}", "./src/renderer/index.html"],
  presets: [baseConfig],
} satisfies Config;
