import type { IncomingMessage, Server, ServerResponse } from "http";
import { join } from "path";
import * as trpcExpress from "@trpc/server/adapters/express";
import cros from "cors";
import express from "express";

import type { Library } from "@rao-pics/db";

import { router } from "..";
import { createContext } from "./utils";

let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
let libraryPath: string | undefined;
let library: Library | null;

export const startExpressServer = async () => {
  if (server) return;

  const app = express();

  const caller = router.createCaller({});
  const config = await caller.config.findUnique();
  library = await caller.library.findUnique();

  const port = config?.serverPort;

  if (!port) throw new Error("serverPort is not defined");

  app.use(cros({ origin: "*" }));

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router,
      createContext,
    }),
  );

  /**
   * 静态文件
   */
  app.use("/static/", (req, res, next) => {
    if (!library) {
      res.status(404).send("library is not defined");
    } else {
      libraryPath = join(library.path, "images");
      express.static(libraryPath, { maxAge: 180 * 1000 * 60 * 60 })(
        req,
        res,
        next,
      );
    }
  });

  server = app.listen(port, () => {
    console.log(`express server is listening on http://localhost:${port}`);
  });
};

/**
 * express.static 需要更新 path
 */
export const updateLibraryPath = async () => {
  const caller = router.createCaller({});
  library = await caller.library.findUnique();

  if (library?.path) {
    libraryPath = join(library.path, "images");
  }
};

export const stopExpressServer = () => {
  if (!server) return;
  server.close();
  server = undefined;
};
