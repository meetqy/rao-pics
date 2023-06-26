import { join } from "path";
import { Menu, Tray, app, nativeTheme, shell } from "electron";

import globalApp from "../global";
import { restoreOrCreateWindow } from "../mainWindow";

const buildResourcesPath = app.isPackaged ? join(process.resourcesPath, "buildResources") : join(__dirname, "../../buildResources");

export const getIcon = (name: string) => join(buildResourcesPath, `${name}-${nativeTheme.shouldUseDarkColors ? "light" : "dark"}.png`);

/**
 * 系统托盘
 * @returns {Tray}
 */
const createTray = () => {
  // 托盘图标
  const tray = new Tray(getIcon("tray"));

  const getMenu = () =>
    Menu.buildFromTemplate([
      {
        label: "打开 Rao Pics",
        type: "normal",
        click: () => {
          void restoreOrCreateWindow().then((window) => {
            window.show();
            window.focus();
          });
        },
      },
      { type: "separator" },
      {
        label: "下载页面",
        type: "normal",
        icon: getIcon("download"),
        click: () => {
          void shell.openExternal("https://github.com/rao-pics/core/releases");
        },
      },
      {
        label: "最新动态",
        icon: getIcon("twitter"),
        type: "normal",
        click: () => {
          void shell.openExternal("https://twitter.com/meetqy");
        },
      },
      {
        label: "开发进度",
        icon: getIcon("todo"),
        type: "normal",
        click: () => {
          void shell.openExternal("https://github.com/orgs/rao-pics/projects/1/views/1");
        },
      },
      { type: "separator" },
      {
        label: "退出",
        type: "normal",
        click: () => {
          globalApp.isQuite = true;
          app.quit();
        },
      },
    ]);
  tray.setContextMenu(getMenu());

  /** 监听 dark/light */
  nativeTheme.on("updated", () => {
    tray.setImage(getIcon("tray"));
    tray.setContextMenu(getMenu());
  });

  return tray;
};

export default createTray;
