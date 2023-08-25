import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
} satisfies Config;
