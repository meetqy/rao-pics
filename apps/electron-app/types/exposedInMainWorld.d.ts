// https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript
interface Window {
  readonly electronTRPC: null;
}
