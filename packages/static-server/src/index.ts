import http from "http";
import serveStatic from "serve-static";

const serve = serveStatic("/Users/meetqy/Pictures/test.library/images");

const server = http.createServer((req, res) => {
  serve(req, res, () => {
    res.statusCode = 404;
    res.end("Not Found");
  });
});

server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
