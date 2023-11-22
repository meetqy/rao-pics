import { closeClientServer, startClientServer } from "./client";
import { closeMainServer, startMainServer } from "./main";

export * from "./main";
export * from "./client";

export const startServer = async () => {
  await startMainServer();
  await startClientServer();
};

export const closeServer = async () => {
  await Promise.all([closeClientServer(), closeMainServer()]);
};
