import { join } from "path";
import { Menu, Tray, app, nativeTheme } from "electron";

let tray: Tray;
export const getTrayIcon = () => {
  if (app.isPackaged) {
    return join(app.getAppPath(), "buildResources", nativeTheme.shouldUseDarkColors ? "tray-dark.png" : "tray-light.png");
  } else {
    return join(__dirname, "../../buildResources", nativeTheme.shouldUseDarkColors ? "tray-dark.png" : "tray-light.png");
  }
};

const createTray = () => {
  if (tray) return tray;

  // 托盘图标
  tray = new Tray(getTrayIcon());

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "打开 Rao Pics",
      type: "normal",
      click: () => {
        app.show();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  return tray;
};

export default createTray;
