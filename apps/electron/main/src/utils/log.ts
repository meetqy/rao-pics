import { join } from "path";
import eLog from "electron-log";

eLog.transports.file.resolvePathFn = (variables) => {
  return join(variables.electronDefaultDir || "", variables.fileName || "main.log");
};

export default eLog;
