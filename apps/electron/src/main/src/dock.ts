import { app } from "electron";
import type { BrowserWindow } from "electron";

import { PLATFORM } from "@rao-pics/constant/server";

/**
 * 隐藏 dock 图标
 * @param window
 */
export const hideDock = (window: BrowserWindow) => {
  if (PLATFORM === "darwin") {
    app.dock.hide();
  } else {
    window.setSkipTaskbar(true);
  }
};
