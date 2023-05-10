import { createServer, createLogger } from "vite";

// process.env.MODE is used in various vite config files
const mode = (process.env.MODE = process.env.MODE ?? "development");

/**
 * Setup server for `web`
 * On file changes: hot reload
 */
function createWebWatchServer() {
  const server = createServer({
    mode,
    customLogger: createLogger("info", { prefix: `[web]` }),
    configFile: "renderer/vite.config.ts",
  });

  return server;
}

// start webserver
const server = await createWebWatchServer();
await server.listen();

export { server as listeningWebServer };
