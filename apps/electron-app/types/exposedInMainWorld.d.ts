// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
interface Window {
  readonly electronTRPC: {
    rpc: (
      op: import("./index").IPCRequestOptions
    ) => Promise<import("./index").IPCResponse>;
  };
}
