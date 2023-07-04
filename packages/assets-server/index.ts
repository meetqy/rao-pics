import express from "express";

import { type Library } from "@acme/db";

const app = express();

let server: ReturnType<typeof app.listen> | null;

const libraryIds: number[] = [];

/**
 * create or restart assets server
 */
export const createAssetsServer = (port: number, librarys?: Library[]) => {
  if (!librarys || librarys.length === 0) {
    server?.close();
    server = null;
    libraryIds.splice(0, libraryIds.length);
    return;
  }

  if (librarys.map((item) => item.id).join(",") === libraryIds.join(",")) {
    return;
  }

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
