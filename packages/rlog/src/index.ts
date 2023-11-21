import { app, dialog } from "electron";
import chalk from "chalk";
import Rollbar from "rollbar";

chalk.level = 1;

const rollbar = new Rollbar({
  accessToken: "0a07f7fe474d459dbd146553f5d202a0",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV ?? "development",
  codeVersion: app.getVersion(),
  reportLevel: "warning",
});

/**
 * RAO.PICS Logger 单例
 * @returns rollbar
 */
export const RLogger = {
  info: (message: string) => {
    console.log(chalk.blue("ℹ " + message));
    rollbar.info(message);
  },

  error: (e: string | Error, alert?: boolean, type?: string) => {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    console.log(chalk.red("✖ " + message));
    rollbar.error(message);

    const t = type ? `[${type}]` : "";

    if (alert) {
      dialog.showErrorBox(`Error ${t}`, message);
    }
  },

  warning: (message: string) => {
    console.log(chalk.yellow("⚠ " + message));
    rollbar.warning(message);
  },
};
