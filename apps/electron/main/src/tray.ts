import { join } from "path";
import { Menu, Tray, app, nativeTheme } from "electron";

export const getTrayIcon = () => {
  if (app.isPackaged) {
    return join(process.resourcesPath, "buildResources", nativeTheme.shouldUseDarkColors ? "tray-dark.png" : "tray-light.png");
  } else {
    return join(__dirname, "../../buildResources", nativeTheme.shouldUseDarkColors ? "tray-dark.png" : "tray-light.png");
  }
};

/**
 * 系统托盘
 * @returns {Tray}
 */
const createTray = () => {
  // 托盘图标
  const tray = new Tray(getTrayIcon());

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开 Rao Pics",
      type: "normal",
      click: () => {
        app.show();
      },
    },
    {
      label: "退出",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  return tray;
};

export default createTray;
