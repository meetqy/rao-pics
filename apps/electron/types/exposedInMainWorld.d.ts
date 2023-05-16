/* eslint-disable @typescript-eslint/consistent-type-imports */
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript

interface Window {
  readonly electronTRPC: {
    rpc: (op: import("./index").IPCRequestOptions) => Promise<import("./index").IPCResponse>;
  };

  readonly electronAPI: {
    library: {
      choose: () => Promise<import("@acme/api").LibraryAdd>;
      update: (dir: string) => Promise<import("@acme/api").LibraryAdd>;
    };
    sync: (library: import("@acme/db").Library) => void;
    onEagleSyncProgress: (emit: import("@acme/eagle").EagleEmit) => void;
  };
}
