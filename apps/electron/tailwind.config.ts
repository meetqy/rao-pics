import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  content: ["./renderer/src/**/*.tsx", "./renderer/index.html"],
  presets: [baseConfig],
} satisfies Config;
