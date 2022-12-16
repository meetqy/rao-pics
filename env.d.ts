declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // eagle资源地址
      LIBRARY: string;
    }
  }
}

namespace EagleUse {
  export type Menu = "/" | "/tags" | "/not-tag" | "recycle" | "/folder/";
}
