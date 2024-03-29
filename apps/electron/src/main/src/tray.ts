import type { BrowserWindow } from "electron";
import { app, Menu, nativeImage, Tray } from "electron";

import icon from "../../../resources/rTemplate@4x.png?asset";

const createTray = (window: BrowserWindow) => {
  const tray = new Tray(nativeImage.createFromPath(icon));

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
