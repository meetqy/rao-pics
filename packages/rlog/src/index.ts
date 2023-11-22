import { dialog } from "electron";
import * as Sentry from "@sentry/electron";
import chalk from "chalk";

import { IS_DEV } from "@rao-pics/constant/server";

chalk.level = 1;

Sentry.init({
  dsn: "https://a5a843cd51513a6b55c1f638d39748af@o4506262672310272.ingest.sentry.io/4506263938203648",
  debug: IS_DEV,
  environment: IS_DEV ? "development" : "production",
});

/**
 * RAO.PICS Logger 单例
 * @returns rollbar
 */
export const RLogger = {
  info: (message: string, type?: string) => {
    const t = type ? `[${type}]` : "";
    console.log(chalk.blue(`ℹ ${t} ${chalk.dim(message)}`));
  },

  /**
   * 需要上报使用 error，否则使用 warning
   * waring 表示错误已经知道，所以无需上报
   * 只有未知错误需要上报
   * @param e
   */
  error: function <T>(e: string | Error | T, alert?: boolean, type?: string) {
    const t = type ? `[${type}]` : "";
    const message = e instanceof Error ? e.message : JSON.stringify(e);

    console.log(chalk.red(`✖ ${t} ${message}`));
    Sentry.captureException(e);

    if (alert) {
      dialog.showErrorBox(`Error ${t}`, message);
    }
  },

  warning: function <T>(e: string | Error | T, type?: string) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    const t = type ? `[${type}]` : "";

    console.log(chalk.yellow(`⚠ ${t} ${message}`));
  },
};
