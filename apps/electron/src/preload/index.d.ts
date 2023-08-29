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
      showMessageBox: (options: Electron.MessageBoxOptions) => Promise<number>;
      showErrorBox: (title: string, content: string) => void;
    };
    shell: {
      openExternal: (
        url: string,
        options?: Electron.OpenExternalOptions,
      ) => Promise<void>;
      showItemInFolder: (path: string) => void;
    };
  }
}
