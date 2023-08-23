import { nativeTheme } from "electron";

import { restoreOrCreateWindow } from "../../mainWindow";

export const toggleMode = async (win?: Electron.BrowserWindow) => {
  if (!win) {
    win = await restoreOrCreateWindow();
  }

  if (nativeTheme.shouldUseDarkColors) {
    win?.setTitleBarOverlay({
      color: "#2b303b",
      symbolColor: "#a6adbb",
    });
  } else {
    // Dark Model
    win?.setTitleBarOverlay({
      color: "#ffffff",
      symbolColor: "#212936",
    });
  }
};
