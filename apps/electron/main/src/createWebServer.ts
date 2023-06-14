import cp from "child_process";
import { join } from "path";
import { app } from "electron";
import { getPort } from "get-port-please";
import ip from "ip";

import { createSqlite } from "@acme/db";

export const createWebServer = async (preNextChild?: cp.ChildProcess) => {
  let nextjsChild: cp.ChildProcess;

  const { isPackaged } = app;

  const _ip = ip.address();
  const _web_port = isPackaged ? (await getPort({ portRange: [9620, 9624], port: 9620 })).toString() : "9620";
  const _assets_port = isPackaged ? (await getPort({ portRange: [9625, 9629], port: 9625 })).toString() : "9625";

  // Init env variables
  process.env["IP"] = _ip;
  process.env["WEB_PORT"] = _web_port;
  process.env["ASSETS_PORT"] = _assets_port;

  if (app.isPackaged) {
    preNextChild?.kill();
    // app config production
    // dev 在 watchDesktop.ts 中指定
    process.env["APP_VERSION"] = app.getVersion();
    process.env["APP_NAME"] = app.getName();

    // Create sqlite database file
    createSqlite(join(process.resourcesPath, "./packages/db/prisma/db.sqlite"));

    // Start nextjs server
    nextjsChild = cp.fork(join(process.resourcesPath, "apps/nextjs/server.js"), {
      env: {
        PORT: (_web_port || 9620).toString(),
      },
    });
  } else {
    // 开发环境 next dev 会自动进行热更新，不需要 kill
    if (preNextChild) return;
    const nextjs = join(process.cwd(), "../nextjs");
    nextjsChild = cp.spawn("npx", ["next", "dev"], {
      shell: true,
      cwd: nextjs,
      stdio: "inherit",
      env: {
        // 不能省略，否则会报错
        ...process.env,
        PORT: _web_port,
      },
    });
  }

  return nextjsChild;
};
