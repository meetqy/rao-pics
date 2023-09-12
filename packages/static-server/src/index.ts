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

  app.use(express.static(path));
  app.use(
    "/blur",
    asyncMiddleware((req, res) => {
      void (async () => {
        const file = readFileSync(join(path, req.path));
        const { base64 } = await getPlaiceholder(file);
        res.send(base64);
      })();
    }),
  );

  app.use((req, res) => {
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
