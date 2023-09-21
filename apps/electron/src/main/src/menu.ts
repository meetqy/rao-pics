import type { BrowserWindow } from "electron";
import { app, Menu } from "electron";

/**
 * 创建菜单
 */
const createMenu = (window: BrowserWindow) => {
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        {
          label: "Close",
          accelerator: "CmdOrCtrl+W",
          click: () => {
            window.hide();
          },
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            window.hide();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
};

export default createMenu;
