import { join } from "path";
import { app, Menu, nativeImage, shell, Tray } from "electron";

import curd from "@acme/curd";

import { restoreOrCreateWindow } from "../mainWindow";

const buildResourcesPath = app.isPackaged ? join(process.resourcesPath, "buildResources") : join(__dirname, "../../buildResources");

const show = () => {
  void restoreOrCreateWindow().then((window) => {
    window.show();
    window.focus();
  });
};

/**
 * 系统托盘
 * @returns {Tray}
 */
const createTray = () => {
  const icon = nativeImage.createFromPath(join(buildResourcesPath, "tray", "iconTemplate@5x.png"));
  const download = nativeImage.createFromPath(join(buildResourcesPath, "tray", "downloadTemplate@2x.png"));
  const todo = nativeImage.createFromPath(join(buildResourcesPath, "tray", "todoTemplate@2x.png"));
  const twitter = nativeImage.createFromPath(join(buildResourcesPath, "tray", "twitterTemplate@2x.png"));

  // 托盘图标
  const tray = new Tray(icon);

  const contextMenu = async () => {
    const res = await curd.library.get({});

    const lib = res[0];
    let first: Electron.MenuItemConstructorOptions | Electron.MenuItem = {
      label: "添加资源库",
      type: "normal",
      click: show,
    };

    if (lib) {
      first = {
        label: `${lib.name} ${lib._count.pendings > 0 ? "(有更新)" : ""}`,
        type: "normal",
        click: () => void shell.openExternal(`http://${process.env["IP"]}:${process.env["WEB_PORT"]}/${lib.name}`),
      };
    }

    return Menu.buildFromTemplate([
      first,
      { type: "separator" },
      {
        label: "下载页面",
        type: "normal",
        icon: download,
        click: () => {
          void shell.openExternal("https://github.com/rao-pics/core/releases");
        },
      },
      {
        label: "最新动态",
        icon: twitter,
        type: "normal",
        click: () => {
          void shell.openExternal("https://twitter.com/meetqy");
        },
      },
      {
        label: "开发进度",
        icon: todo,
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
          app.quit();
        },
      },
    ]);
  };

  tray.on("click", (e) => {
    void (async () => {
      if (e.altKey) {
        tray.popUpContextMenu(await contextMenu());
      } else {
        show();
      }
    })();
  });

  tray.on("right-click", () => {
    void (async () => {
      const menu = await contextMenu();
      tray.popUpContextMenu(menu);
    })();
  });

  return tray;
};

export default createTray;
