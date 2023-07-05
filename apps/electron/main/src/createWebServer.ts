import cp from "child_process";
import { join } from "path";
import { app } from "electron";

/**
 * 创建 Web 服务
 */
export const createWebServer = (preNextChild?: cp.ChildProcess) => {
  let nextjsChild: cp.ChildProcess;

  const { isPackaged } = app;

  if (isPackaged) {
    // Start nextjs server
    nextjsChild = cp.fork(join(process.resourcesPath, "apps/nextjs/server.js"), {
      env: {
        PORT: (process.env["WEB_PORT"] || 9620).toString(),
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
        PORT: process.env["WEB_PORT"],
      },
    });
  }

  return nextjsChild;
};
