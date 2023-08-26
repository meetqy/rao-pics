import type { BrowserWindow } from "electron";

import { createSystemIPC } from "./system";

export const createCustomIPC = (window: BrowserWindow) => {
  createSystemIPC(window);
};
