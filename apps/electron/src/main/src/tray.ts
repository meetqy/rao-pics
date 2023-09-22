import type { BrowserWindow } from "electron";
import { app, Menu, nativeImage, Tray } from "electron";

import { PLATFORM } from "@rao-pics/constant/server";

import iconWin from "../../../resources/icon_win.png?asset";
import icon from "../../../resources/iconTemplate@3x.png?asset";

const createTray = (window: BrowserWindow) => {
  const tray = new Tray(
    nativeImage.createFromPath(PLATFORM === "win32" ? iconWin : icon),
  );

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "关于",
      click: () => {
        app.showAboutPanel();
      },
    },
    { type: "separator" },
    {
      label: "退出",
      click: () => {
        process.env.QUITE = "true";
        app.quit();
      },
    },
  ]);

  tray.on("click", (e) => {
    if (e.altKey) {
      // 触控板 + alt 显示菜单
      tray.popUpContextMenu(contextMenu);
    } else {
      window.show();
    }
  });

  tray.on("right-click", () => {
    tray.popUpContextMenu(contextMenu);
  });
};

export default createTray;
