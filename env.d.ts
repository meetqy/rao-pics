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

  // 图片
  export interface Image {
    id: string;
    name: string;
    size: number;
    btime: number;
    mtime: number;
    ext: string;
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
    tags?: Tag[];
    folders?: Folder[];
  }

  // 文件夹
  export interface Folder {
    id: string;
    name: string;
    description: string;
    pid: any;
    modificationTime: number;
    iconColor: any;
    icon: any;
    password: string;
    passwordTips: string;
    children: Folder[];
    _count: {
      images: number;
    };
  }

  // 标签
  export interface Tag {
    id: string;
    name: string;
    starred: boolean;
    _count: {
      images: number;
    };
    tagsGroups: TagsGroupsItem[];
  }

  export interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }

  export interface TagsGroupsItem {
    id: string;
    name: string;
    color?: string;
  }

  export interface SearchParams {
    // 标签
    tags?: string[];
    //   尺寸
    size?: {
      width: {
        min: number;
        max: number;
      };
      height: {
        min: number;
        max: number;
      };
    };
    includes?: ("tags" | "folders")[];
  }
}
