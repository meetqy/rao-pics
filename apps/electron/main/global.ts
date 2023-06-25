const globalApp = globalThis as {
  /** 是否退出 App */
  isQuite?: boolean;
};

globalApp.isQuite = false;

export default globalApp;
