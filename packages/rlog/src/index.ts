import chalk from "chalk";

chalk.level = 1;

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
  error: function <T>(
    e: string | Error | T,
    type?: string,
    callback?: (type: string, msg: string) => void,
  ) {
    const t = type ? `[${type}]` : "";
    const message = e instanceof Error ? e.message : JSON.stringify(e);

    console.log(chalk.red(`✖ ${t} ${message}`));

    callback?.(t, message);
  },

  warning: function <T>(e: string | Error | T, type?: string) {
    const message = e instanceof Error ? e.message : JSON.stringify(e);
    const t = type ? `[${type}]` : "";

    console.log(chalk.yellow(`⚠ ${t} ${message}`));
  },
};
