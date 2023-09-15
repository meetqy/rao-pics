import { readFileSync } from "fs";
import type { IncomingMessage, Server, ServerResponse } from "http";
import { join } from "path";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import express from "express";
import { getPlaiceholder } from "plaiceholder";

import { router } from "@rao-pics/api";

let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
const app = express();

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

/**
 *
 * @param path
 * @returns
 */
export const startStaticServer = async () => {
  const caller = router.createCaller({});
  const config = await caller.config.get();
  const library = await caller.library.get();

  const port = config?.staticServerPort;

  if (!port) throw new Error("staticServerPort is not defined");

  if (!library) return;
  if (server) return;

  const path = join(library.path, "images");

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

  app.use(express.static(path, { maxAge: 180 * 1000 * 60 * 60 }));
  app.use(
    "/blur",
    asyncMiddleware((req, res) => {
      void (async () => {
        const parts = req.path.split("/");
        const imageDbPath = join(
          path,
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
          const file = readFileSync(join(path, req.path));
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

  app.use((_req, res) => {
    res.statusCode = 404;
    res.end("Not Found");
  });

  server = app.listen(port, () => {
    console.log(`static server is listening on http://localhost:${port}`);
  });
};

export const stopStaticServer = () => {
  if (!server) return;
  server.close();
  server = undefined;
};
