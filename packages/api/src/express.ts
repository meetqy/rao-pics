import type { IncomingMessage, Server, ServerResponse } from "http";
import { join } from "path";
import * as trpcExpress from "@trpc/server/adapters/express";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import express from "express";
import { readFileSync } from "fs-extra";
import { getPlaiceholder } from "plaiceholder";

import { router } from "..";
import { createContext } from "./utils";

/**
 * reference https://stackoverflow.com/questions/51535455/express-js-use-async-function-on-requests
 * @param fn
 * @returns
 */
const asyncMiddleware =
  (fn: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
let libraryPath: string | undefined;

export const startExpressServer = async () => {
  if (server) return;

  const app = express();

  const caller = router.createCaller({});
  const config = await caller.config.get();
  const library = await caller.library.get();

  const port = config?.serverPort;

  if (!port) throw new Error("serverPort is not defined");

  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PATCH, PUT, DELETE",
    );
    res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
    next();
  });

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
      return res.status(404).send("library is not defined");
    }

    libraryPath = join(library.path, "images");
    express.static(libraryPath, { maxAge: 180 * 1000 * 60 * 60 })(
      req,
      res,
      next,
    );
  });

  /**
   * 占位图
   */
  app.use(
    "/static/blur/",
    asyncMiddleware((req, res) => {
      void (async () => {
        const parts = req.path.split("/");
        const imageDbPath = join(
          libraryPath ?? "",
          parts[parts.length - 2] ?? "",
          "metadata.json",
        );
        const image = await caller.image.findUnique({
          path: imageDbPath,
        });

        res.writeHead(200, {
          "Content-Type": "image/png",
        });

        if (image?.blurDataURL) {
          const img = Buffer.from(
            image.blurDataURL.replace(
              /^data:image\/(png|jpeg|jpg);base64,/,
              "",
            ),
            "base64",
          );
          res.end(img);
        } else {
          const file = readFileSync(join(libraryPath ?? "", req.path));
          const { base64 } = await getPlaiceholder(file);
          const img = Buffer.from(
            base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
            "base64",
          );

          void caller.image.update({
            path: imageDbPath,
            blurDataURL: `data:image/png;base64,${img.toString("base64")}`,
          });

          res.end(img);
        }
      })();
    }),
  );

  server = app.listen(port, () => {
    console.log(`express server is listening on http://localhost:${port}`);
  });
};

export const updateLibraryPath = async () => {
  const caller = router.createCaller({});
  const library = await caller.library.get();

  if (library?.path) {
    libraryPath = join(library.path, "images");
  }
};

export const stopExpressServer = () => {
  if (!server) return;
  server.close();
  server = undefined;
};
