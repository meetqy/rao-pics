declare namespace EagleUse {
  // 图片
  interface Image {
    id: string;
    name: string;
    size: number;
    // 创建日期
    btime: number;
    mtime: number;
    // 扩展名
    ext: string;
    url: string;
    // 注释
    annotation: string;
    // 添加日期
    modificationTime: number;
    width: number;
    height: number;
    // json字符串
    palettes: string;
    lastModified: number;
    isDeleted: boolean;
    deletedTime: number;
    processingPalette: boolean;
    noThumbnail: boolean;
    star: number;
    nsfw: boolean;
    tags?: (Tag | string)[];
    folders?: Folder[];
    metadataMTime: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    duration?: string;
  }

  // 文件夹
  interface Folder {
    id: string;
    name: string;
    description: string;
    modificationTime: number;
    iconColor: string;
    icon: string;
    password: string;
    passwordTips: string;
    children?: Folder[];
    pid?: string;
    images?: Image[];
    _count?: {
      images: number;
    };
  }

  // 标签
  interface Tag {
    id: string;
    name: string;
    starred: boolean;
    _count: {
      images: number;
    };
    tagsGroups: TagsGroupsItem[];
  }

  interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }

  interface TagsGroupsItem {
    id: string;
    name: string;
    color?: string;
    tags: (Tag | string)[];
  }
}
