import { app } from "electron";

/**
 * 退出程序
 */
export const exit = () => {
  process.env.QUITE = "true";
  app.quit();
};
