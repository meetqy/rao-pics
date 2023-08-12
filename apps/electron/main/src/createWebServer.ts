import cp from "child_process";
import { join } from "path";
import { app } from "electron";

let webServerCP: cp.ChildProcess;

/**
 * 创建 Web 服务
 */
export const createWebServer = () => {
  const { isPackaged } = app;

  if (isPackaged) {
    closeWebServer();

    // Start nextjs server
    webServerCP = cp.fork(join(process.resourcesPath, "apps/nextjs/server.js"), {
      detached: true,
      env: {
        PORT: (process.env["WEB_PORT"] || 9620).toString(),
      },
    });
  } else {
    // 开发环境 next dev 会自动进行热更新，不需要 kill
    if (webServerCP) return;

    const nextjs = join(process.cwd(), "../nextjs");
    webServerCP = cp.spawn("npx", ["next", "dev"], {
      cwd: nextjs,
      detached: true,
      env: {
        // 不能省略，否则会报错
        ...process.env,
        PORT: process.env["WEB_PORT"],
      },
    });
  }

  if (!webServerCP) {
    throw new Error("Not start web server, please restart app.");
  }
};

export const closeWebServer = () => {
  if (webServerCP) {
    webServerCP.kill();
    webServerCP.pid && process.kill(-webServerCP.pid);
  }
};
