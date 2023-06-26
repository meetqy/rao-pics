/* eslint-disable @typescript-eslint/consistent-type-imports */

// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript

interface Window {
  /** Same as Main.app */
  readonly app: {
    getVersion: () => Promise<string>;
    getName: () => Promise<string>;
  };

  /** Same as Main.dialog */
  readonly dialog: {
    /**
     * Same as showOpendialog, But it doesn't have 'browserWindow' argument.
     */
    showOpenDialog: (options: Electron.OpenDialogOptions) => Promise<string[] | undefined>;
  };

  readonly electronAPI: {
    /**
     * Handle choose directory by 'showOpendialog'
     */
    handleDirectory: (dir: string) => Promise<import("./index").HandleDirectoryReturn>;
    library: {
      choose: () => Promise<import("@acme/api").LibraryAdd>;
      update: (dir: string) => Promise<import("@acme/api").LibraryAdd>;
      assetsServer: (librarys: import("@acme/db").Library[]) => void;
    };
    sync: (library: import("@acme/db").Library) => void;
    onEagleSyncProgress: (emit: import("@acme/eagle").EagleEmit) => void;
    openUrl: (url: string) => void;
  };
}
