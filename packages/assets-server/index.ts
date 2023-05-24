import express from "express";

import { type Library } from "@acme/db";

const app = express();

let server: ReturnType<typeof app.listen> | null;

const libraryIds: number[] = [];

// 可随意调用，是否重启内部会做判断
// 重启之后，会关闭上一个服务器
export const createAssetsServer = (librarys: Library[], port: number) => {
  if (librarys.map((item) => item.id).join(",") === libraryIds.join(",")) {
    // library数量 一样无需重启
    return;
  }

  if (server) {
    server.close();
    server = null;
  }

  console.log("----------------------------------------------------", librarys);

  libraryIds.splice(0, libraryIds.length);

  librarys.forEach((lib) => {
    if (lib.type === "eagle") {
      app.use("/" + lib.id.toString(), express.static(lib.dir + "/images"));
      libraryIds.push(lib.id);
    }
  });

  server = app.listen(port, () => {
    console.log(`Assets server listening on http://localhost:${port}`);
  });
};

export const closeAssetsServer = () => {
  if (server) {
    server.close();
    server = null;
  }
};
