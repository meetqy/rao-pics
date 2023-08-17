import { join } from "path";
import { app, Menu, nativeImage, shell, Tray, type MenuItem } from "electron";

import curd from "@acme/curd";
import { translations } from "@acme/lang";

import { restoreOrCreateWindow } from "../mainWindow";

const buildResourcesPath = app.isPackaged ? join(process.resourcesPath, "buildResources") : join(__dirname, "../../buildResources");

const show = () => {
  void restoreOrCreateWindow().then((window) => {
    window.hide();
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

    const { translation, lang, config } = await translations();
    const json = {
      中文简体: "zh-cn",
      中文繁体: "zh-tw",
      English: "en-us",
    };

    const lib = res[0];
    let first: Electron.MenuItemConstructorOptions | Electron.MenuItem = {
      label: translation["electron.main.add"],
      type: "normal",
      click: show,
    };

    if (lib) {
      first = {
        label: `${lib.name} ${lib._count.pendings > 0 ? `(${translation["electron.main.add.desc"]})` : ""}`,
        type: "normal",
        click: () => void shell.openExternal(`http://${process.env["IP"]}:${process.env["WEB_PORT"]}/${lib.name}`),
      };
    }

    const langClick = (menu: MenuItem) => {
      const l = json[menu.label as keyof typeof json] as "zh-cn" | "zh-tw" | "en-us";

      if (config) {
        void (async () => {
          await curd.config.update({
            ...config,
            lang: l,
          });

          show();
        })();
      }
    };

    return Menu.buildFromTemplate([
      first,
      {
        label: translation["electron.main.language"],
        submenu: [
          { label: "中文简体", type: "radio", checked: lang === "zh_cn", click: langClick },
          { label: "中文繁体", type: "radio", checked: lang === "zh_tw", click: langClick },
          { label: "English", type: "radio", checked: lang === "en_us", click: langClick },
        ],
      },
      { type: "separator" },
      {
        label: translation["electron.main.download"],
        type: "normal",
        icon: download,
        click: () => {
          void shell.openExternal("https://github.com/rao-pics/core/releases");
        },
      },
      {
        label: translation["electron.main.news"],
        icon: twitter,
        type: "normal",
        click: () => {
          void shell.openExternal("https://twitter.com/meetqy");
        },
      },
      {
        label: translation["electron.main.todos"],
        icon: todo,
        type: "normal",
        click: () => {
          void shell.openExternal("https://github.com/orgs/rao-pics/projects/1/views/1");
        },
      },
      { type: "separator" },
      {
        label: translation["electron.main.quite"],
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
