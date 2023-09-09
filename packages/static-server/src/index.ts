import http from "http";
import { join } from "path";
import serveStatic from "serve-static";

export const startStaticServer = (path: string) => {
  const serve = serveStatic(join(path, "images"));

  const server = http.createServer((req, res) => {
    serve(req, res, () => {
      res.statusCode = 404;
      res.end("Not Found");
    });
  });

  server.listen(3000, () => {
    console.log("Static Server is listening on http://localhost:3000");
  });
};
