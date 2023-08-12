import express from "express";

import { type Library } from "@acme/db";

const app = express();

let server: ReturnType<typeof app.listen> | null;

const libraryIds: number[] = [];

export const closeAssetsServer = (tips = "assets server close") => {
  server?.close((err) => {
    console.log(tips, err && err);
  });
};

/**
 * create or restart assets server
 */
export const createAssetsServer = (port: number, librarys?: Library[]) => {
  if (!librarys || librarys.length === 0) {
    closeAssetsServer();
    server = null;
    libraryIds.splice(0, libraryIds.length);
    return;
  }

  if (librarys.map((item) => item.id).join(",") === libraryIds.join(",")) {
    return;
  }

  closeAssetsServer("assets server restarting");

  // clear library ids
  libraryIds.splice(0, libraryIds.length);

  // Generate app use by library ids
  librarys.forEach((lib) => {
    if (lib.type === "eagle") {
      app.use("/" + lib.id.toString() + "/images", express.static(lib.dir + "/images"));
      libraryIds.push(lib.id);
    }
  });

  server = app.listen(port, () => {
    console.log(`Assets server listening on http://localhost:${port}`);
  });
};
