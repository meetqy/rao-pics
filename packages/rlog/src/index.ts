import Rollbar from "rollbar";

let rollbar: Rollbar;

/**
 * RAO.PICS Logger 单例
 * @returns rollbar
 */
export function RLogger() {
  if (!rollbar) {
    rollbar = new Rollbar({
      accessToken: "0a07f7fe474d459dbd146553f5d202a0",
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment: "production",
    });
  }

  return rollbar;
}
