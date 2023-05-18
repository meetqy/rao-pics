/* eslint-disable */

import { writeFileSync } from "fs";
import { createServer } from "http";
import path from "path";
import { parse } from "url";
import next from "next";

const port = parseInt("3000", 10);
const dev = process.env.NODE_ENV !== "production";
const dir = path.resolve(process.resourcesPath, "apps/nextjs");

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

export const startNextServer = () =>
  void app.prepare().then(() => {
    createServer(async (req, res) => {
      const parsedUrl = parse(req.url || "/", true);

      try {
        await handle(req, res, parsedUrl);
      } catch (e) {
        writeFileSync("/Users/qymeet/Desktop/error.txt", e + "");
        res.end(e + "");
      }
    }).listen(port);

    console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
  });
