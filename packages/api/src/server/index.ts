import { startClientServer } from "./client";
import { startMainServer } from "./main";

export * from "./main";
export * from "./client";

export const startServer = async () => {
  await startMainServer();
  await startClientServer();
};

export const closeServer = async () => {
  await Promise.all([startMainServer(), startClientServer()]);
};
