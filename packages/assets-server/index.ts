import express from "express";

import { type Library } from "@acme/db";

const app = express();

export const createAssetsServer = (library: Library[], port: number) => {
  library.forEach((lib) => {
    if (lib.type === "eagle") {
      app.use("/" + lib.id.toString(), express.static(lib.dir + "/images"));
    }
  });

  return app.listen(port, () => {
    console.log(`Assets server listening on http://localhost:${port}`);
  });
};
