import { readFileSync } from "fs";
import type { IncomingMessage, Server, ServerResponse } from "http";
import { join } from "path";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import express from "express";
import getPort, { portNumbers } from "get-port";
import { getPlaiceholder } from "plaiceholder";

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
 * 启动静态文件服务器，自动获取获取可用端口 并返回
 * @param path
 * @param port
 * @returns
 */
export const startStaticServer = async (path: string, port?: number) => {
  if (server) return;
  const _port = port ?? (await getPort({ port: portNumbers(9100, 9300) }));

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
        const file = readFileSync(join(path, req.path));
        const { base64 } = await getPlaiceholder(file);
        const img = Buffer.from(
          base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
          "base64",
        );
        res.writeHead(200, {
          "Content-Type": "image/png",
        });

        res.end(img);
      })();
    }),
  );

  app.use((_req, res) => {
    res.statusCode = 404;
    res.end("Not Found");
  });

  server = app.listen(_port, () => {
    console.log(`static server is listening on http://localhost:${_port}`);
  });

  return port;
};

export const stopStaticServer = () => {
  if (!server) return;
  server.close();
  server = undefined;
};
