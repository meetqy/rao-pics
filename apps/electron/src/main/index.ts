import { join } from "path";
import { app, BrowserWindow, dialog, shell } from "electron";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import ip from "ip";

import { closeServer, router, routerCore, startServer } from "@rao-pics/api";
import { PLATFORM } from "@rao-pics/constant/server";
import { createDbPath, migrate } from "@rao-pics/db";
import { RLogger } from "@rao-pics/rlog";
import { exit } from "@rao-pics/utils/server";

import { hideDock } from "./src/dock";
import { createCustomIPCHandle } from "./src/ipc";
import createMenu from "./src/menu";
import createTray from "./src/tray";

/** 当前版本 */
process.env.APP_VERSION = app.getVersion();

const controller = new AbortController();

// 窗口获取焦点时更新 ip
app.on("browser-window-focus", () => {
  const caller = router.createCaller({});
  caller.config.upsert({
    ip: ip.address(),
  });
  // .catch((e) => RLogger().error(e as Error));
});

async function initWatchLibrary() {
  const caller = router.createCaller({});
  const res = await caller.library.findUnique();
  const config = await caller.config.findUnique();
  if (!res) return;

  const { path } = res;
  if (res.type === "eagle") {
    await caller.library.watch({
      path,
      isReload: true,
      isStartDiffLibrary: config?.startDiffLibrary ?? false,
    });
  }
}

const mainWindowReadyToShow = async () => {
  // 初始化 config
  await routerCore.config.upsert({});

  await startServer();
  await initWatchLibrary();
};

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 768,
    height: 450,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: "hidden",
    frame: false,
    transparent: true,
    trafficLightPosition: {
      y: 16,
      x: 12,
    },
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    void shell.openExternal(details.url);
    return { action: "deny" };
  });

  mainWindow.on("close", (e) => {
    if (process.env.QUITE != "true") {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    await migrate();
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // 创建 db.sqlite 文件
    createDbPath(join(process.resourcesPath, "extraResources", "db.sqlite"));
    // 迁移
    await migrate(join(process.resourcesPath, "extraResources", "migrations"));
    void mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  await mainWindowReadyToShow();

  createCustomIPCHandle();
  createMenu(mainWindow);
  createTray(mainWindow);
  hideDock(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId("com.rao-pics");

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    await createWindow();

    RLogger.info(
      `[app.whenReady] NODE_ENV: ${
        process.env.NODE_ENV ?? "development"
      }, APP_VERSION: ${process.env.APP_VERSION ?? "0.0.0"}`,
    );

    // throw Error("测试错误");

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) void createWindow();
    });
  })
  .catch((e) => {
    RLogger.error(e as Error, true, "app.whenReady");
    exit();
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", (e) => {
  if (process.env.QUITE != "true") {
    e.preventDefault();
  }
});

app.on("quit", () => {
  // 关闭子进程
  controller.abort();
  // 关闭静态服务器
  void closeServer();

  if (PLATFORM != "darwin") {
    app.quit();
  }
});

// Catch all error.
process.on("uncaughtException", (error) => {
  dialog.showErrorBox("Error", error.message);
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
