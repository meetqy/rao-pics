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
    console.log(chalk.blue(`ℹ ${t} ${message}`));
  },

  error: (e: string | Error, alert?: boolean, type?: string) => {
    const t = type ? `[${type}]` : "";
    const message = e instanceof Error ? e.message : JSON.stringify(e);

    console.log(chalk.red(`✖ ${t} ${message}`));
    Sentry.captureException(e);

    if (alert) {
      dialog.showErrorBox(`Error ${t}`, message);
    }
  },

  warning: (message: string, type?: string) => {
    const t = type ? `[${type}]` : "";
    console.log(chalk.yellow(`⚠ ${t} ${message}`));
  },
};
