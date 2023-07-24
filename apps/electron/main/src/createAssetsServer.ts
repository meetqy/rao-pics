import { join } from "path";
import express from "express";

import { type Library } from "@acme/db";
import { thumbnailDirCache } from "@acme/util";

const app = express();

let server: ReturnType<typeof app.listen> | null;

const libraryIds: number[] = [];

/**
 * create or restart assets server
 */
export const createAssetsServer = (port: number, librarys?: Library[]) => {
  if (!librarys || librarys.length === 0) {
    server?.close((err) => {
      console.log("assets server close", err || "");
    });
    server = null;
    libraryIds.splice(0, libraryIds.length);
    return;
  }

  if (librarys.map((item) => item.id).join(",") === libraryIds.join(",")) {
    return;
  }

  server?.close((e) => {
    console.log("assets server restarting", e || "");
  });

  // clear library ids
  libraryIds.splice(0, libraryIds.length);

  // Generate app use by library ids
  librarys.forEach((lib) => {
    switch (lib.type) {
      case "eagle": {
        app.use("/" + lib.id.toString() + "/images", express.static(lib.dir + "/images"));
        libraryIds.push(lib.id);
        break;
      }
      case "folder": {
        app.use("/" + lib.id.toString(), express.static(join(thumbnailDirCache, lib.id.toString())));
        app.use("/" + lib.id.toString(), express.static(join(lib.dir)));
        libraryIds.push(lib.id);
        break;
      }
    }
  });

  server = app.listen(port, () => {
    console.log(`Assets server listening on http://localhost:${port}`);
  });
};
