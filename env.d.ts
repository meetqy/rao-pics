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
    // json字符串
    tags: Tag[];
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
    star: number;
  }

  export interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }

  export interface Tag {
    id: string;
    name: string;
    starred: boolean;
    _count: {
      images: number;
    };
  }
}
