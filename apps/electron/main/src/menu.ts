import { Menu, app } from "electron";

import { getWindow } from "../mainWindow";

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
          click: () => {
            void getWindow().then((window) => {
              window.hide();
            });
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
};

export default createMenu;
