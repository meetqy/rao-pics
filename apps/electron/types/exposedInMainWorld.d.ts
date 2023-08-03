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
    /**
     *
     * Same as showMessageBox, But it doesn't have 'browserWindow' argument.
     */
    showMessageBox: (options: Electron.MessageBoxOptions) => Promise<string[] | undefined>;
  };

  readonly shell: {
    /**
     * Same as shell.openExternal
     */
    openExternal: (url: string, options?: Electron.OpenExternalOptions) => Promise<void>;
  };

  readonly electronAPI: {
    /**
     * Handle choose directory by 'showOpendialog'
     */
    handleDirectory: (dir: string) => Promise<import("./index").HandleDirectoryReturn>;

    /**
     * create or restart assets server
     */
    createAssetsServer: (librarys?: import("@acme/db").Library[]) => Promise<void>;
  };
}
