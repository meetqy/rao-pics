import type { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    dialog: {
      /**
       * Same as showOpendialog, But it doesn't have 'browserWindow' argument.
       */
      showOpenDialog: (
        options: Electron.OpenDialogOptions,
      ) => Promise<string[] | undefined>;
      /**
       *
       * Same as showMessageBox, But it doesn't have 'browserWindow' argument.
       */
      showMessageBox: (
        options: Electron.MessageBoxOptions,
      ) => Promise<string[] | undefined>;
    };
  }
}
