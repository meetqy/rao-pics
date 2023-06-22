import path from "path";
import { BrowserWindow, app } from "electron";
import { createIPCHandler } from "electron-trpc/main";

import { router } from "./api";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

const preload = path.join(__dirname, "./preload.js");
const url = process.env["VITE_DEV_SERVER_URL"];

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  createIPCHandler({ router, windows: [win] });

  if (url) {
    void win.loadURL(url);
  } else {
    void win.loadFile(path.join(process.env["DIST"] || "", "index.html"));
  }

  win.show();
});
