import { createSystemIPC } from "./system";

let ipc = false;
export const createCustomIPCHandle = () => {
  if (ipc) return;

  ipc = true;
  createSystemIPC();
};
