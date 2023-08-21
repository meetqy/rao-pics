// import type { Config } from "tailwindcss";

// import baseConfig from "@rao-pics/tailwind-config";

// export default {
//   content: ["./src/renderer/index.html", "./src/renderer/**/*.tsx"],
//   presets: [baseConfig],
// } satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
