import http from "http";
import { join } from "path";
import getPort, { portNumbers } from "get-port";
import serveStatic from "serve-static";

let server: http.Server | undefined;

/**
 * 启动静态文件服务器，自动获取获取可用端口 并返回
 * @param path
 * @returns
 */
export const startStaticServer = async (path: string, port?: number) => {
  if (server) return;
  const _port = port ?? (await getPort({ port: portNumbers(9100, 9300) }));

  const serve = serveStatic(join(path, "images"));

  server = http.createServer((req, res) => {
    serve(req, res, () => {
      res.statusCode = 404;
      res.end("Not Found");
    });
  });

  server.listen(_port, () => {
    console.log(`Static Server is listening on http://localhost:${_port}`);
  });

  return _port;
};

export const stopStaticServer = () => {
  if (!server) return;
  server.close();
  server = undefined;
};
