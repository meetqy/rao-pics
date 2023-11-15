import { startMainServer } from "./main";
import { startStaticServer } from "./static";

export * from "./main";
export * from "./static";

export const startServer = async () => {
  await startMainServer();
  await startStaticServer();
};

export const closeServer = async () => {
  await Promise.all([startMainServer(), startStaticServer()]);
};
