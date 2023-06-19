import { Menu, app } from "electron";

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
            app.hide();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
};

export default createMenu;
