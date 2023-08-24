import { join } from "path";
import { app, BrowserWindow, shell } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";

import { router } from "@rao-pics/api";
import { IS_DEV } from "@rao-pics/constant";
import { createDbPath } from "@rao-pics/db";

import icon from "../../resources/icon.png?asset";
import { createCustomIPC } from "./src/ipc";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 768,
    height: 450,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 48,
      color: "#ffffff",
      symbolColor: "#212936",
    },
    trafficLightPosition: {
      y: 10,
      x: 12,
    },
    ...(process.platform === "linux" ? { icon } : {}),
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

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    void mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  createIPCHandler({ router, windows: [mainWindow] });
  createCustomIPC();
}

// dialog.showErrorBox(
//   "Error",
//   `${join(process.resourcesPath, "extraResources/db.sqlite")}`,
// );

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    if (!IS_DEV) {
      createDbPath(join(process.resourcesPath, "extraResources/db.sqlite"));
    }

    // Set app user model id for windows
    electronApp.setAppUserModelId("com.rao-pics");

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .catch((e) => {
    throw e;
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
