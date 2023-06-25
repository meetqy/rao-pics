/* eslint-disable @typescript-eslint/consistent-type-imports */

interface Env {
  ip: string;
  web_port: string;
  assets_port: string;
  name: string;
  version: string;
}

// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
interface Window {
  readonly app: {
    getVersion: () => Promise<string>;
    getName: () => Promise<string>;
  };

  readonly electronAPI: {
    library: {
      choose: () => Promise<import("@acme/api").LibraryAdd>;
      update: (dir: string) => Promise<import("@acme/api").LibraryAdd>;
      assetsServer: (librarys: import("@acme/db").Library[]) => void;
    };
    sync: (library: import("@acme/db").Library) => void;
    onEagleSyncProgress: (emit: import("@acme/eagle").EagleEmit) => void;
    openUrl: (url: string) => void;
    getEnv: () => Promise<Env>;
  };
}
