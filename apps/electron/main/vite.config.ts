import { builtinModules } from "module";
import { join } from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";

import { node } from "../.electron-vendors.cache.json";

const PACKAGE_ROOT = __dirname;

const isDev = process.env.NODE_ENV === "development";

// why is this needed? Isn't `node` typed as "string" already?
if (typeof node !== "string") {
  throw new Error(`The imported vendor version was not a string`);
}

// https://vitejs.dev/config/
// import.meta vite specific vars have not been injected yet here.
// for example: import.meta.env.MODE isn't available and automatically gets set to "production" during vite build
// to override that behaviour: set an env MODE variable and pass a mode: process.env.MODE to the vite config
// https://vitejs.dev/guide/env-and-mode.html

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      "/@/": join(PACKAGE_ROOT) + "/",
    },
  },
  build: {
    ssr: true,
    target: `node${node}`,
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: ".",
    // set to development in the watch script
    minify: !isDev,
    lib: {
      entry: "./index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        // Exclude Electron from built output
        "electron",
        // Exclude Node builtin modules.
        ...builtinModules.flatMap((p) => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    reportCompressedSize: false,
  },
  plugins: [
    // Put the Sentry vite plugin after all other plugins
    !isDev &&
      sentryVitePlugin({
        org: "meetqy",
        project: "rao-pics",
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and need `project:releases` and `org:read` scopes
        authToken: "7979f62cdaee7ba46204863b5777bec04eed627ccb7a2c5d32262ad3a04672e7",
      }),
  ],
});
