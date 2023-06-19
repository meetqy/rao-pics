import { Menu, app } from "electron";

import { hideWindow } from "../mainWindow";

/**
 * 创建菜单
 */
const createMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click: () => hideWindow(),
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
};

export default createMenu;
