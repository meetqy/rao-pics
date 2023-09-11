import http from "http";
import { join } from "path";
import getPort, { portNumbers } from "get-port";
import serveStatic from "serve-static";

let isStaticServerRunning = false;

export const startStaticServer = async (path: string) => {
  if (isStaticServerRunning) return;
  const port = await getPort({ port: portNumbers(9100, 9300) });
  isStaticServerRunning = true;

  const serve = serveStatic(join(path, "images"));

  const server = http.createServer((req, res) => {
    serve(req, res, () => {
      res.statusCode = 404;
      res.end("Not Found");
    });
  });

  server.listen(port, () => {
    console.log(`Static Server is listening on http://localhost:${port}`);
  });

  return port;
};
