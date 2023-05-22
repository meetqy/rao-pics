import os from "os";
import { type IpcMain } from "electron";

const getIpAddress = () => {
  const interfaces = os.networkInterfaces();
  const addresses = Object.values(interfaces)
    .flat()
    .filter((details) => details?.family === "IPv4" && !details.internal)
    .map((details) => details?.address);
  return addresses[0];
};

export const baseIpc = (ipcMain: IpcMain) => {
  const base = {
    ip: getIpAddress(),
  };

  ipcMain.on("base", (event) => {
    event.sender.send("on-base", base);
  });
};
