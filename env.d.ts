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

  export interface Image {
    id: string;
    name: string;
    size: number;
    btime: number;
    mtime: number;
    ext: string;
    tags: string;
    folders: string;
    url: string;
    annotation: string;
    // 添加日期
    modificationTime: number;
    width: number;
    height: number;
    palettes: string;
    lastModified: number;
    isDeleted: boolean;
    deletedTime: number;
    // json字符串
    processingPalette: string;
    noThumbnail: boolean;
  }

  export interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }
}
