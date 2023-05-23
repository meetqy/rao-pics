import express from "express";

import { type Library } from "@acme/db";

const app = express();

let assetServer: ReturnType<typeof createAssetsServer> | null;

export const createAssetsServer = (library: Library[], port: number) => {
  library.forEach((lib) => {
    if (lib.type === "eagle") {
      app.use("/" + lib.id.toString(), express.static(lib.dir + "/images"));
    }
  });

  const server = app.listen(port, () => {
    console.log(`Assets server listening on http://localhost:${port}`);
  });

  assetServer = server;

  return server;
};

export const closeAssetsServer = () => {
  if (assetServer) {
    assetServer.close();
    assetServer = null;
  }
};
