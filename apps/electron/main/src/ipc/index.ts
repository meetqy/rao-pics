import { createElectronApiIPCHandler } from "./api";
import { createAppIPCHandler } from "./app";
import { createDialogIPCHandler } from "./dialog";
import { createProcessIPCHandler } from "./process";
import { createShellIPCHandler } from "./shell";

/**
 * create all ipcHander
 */
const createAllIPCHandler = () => {
  createAppIPCHandler();
  createDialogIPCHandler();
  createElectronApiIPCHandler();
  createShellIPCHandler();
  createProcessIPCHandler();
};

export default createAllIPCHandler;
