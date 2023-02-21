declare namespace EagleUse {
  // 图片
  export interface Image {
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
    tags?: Tag[] | string[];
    folders?: Folder[];
  }

  // 文件夹
  export interface Folder {
    id: string;
    name: string;
    description: string;
    pid: string;
    modificationTime: number;
    iconColor: string;
    icon: string;
    password: string;
    passwordTips: string;
    children?: Folder[];
    _count: {
      images: number;
    };
    images?: Image[];
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
    tags: Tag[];
  }

  export interface SearchParams {
    // 标签
    tags?: string[];
    // 未标签
    noTags?: boolean;
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
    // 注释
    annotation?: string;
    // 排序
    orderBy?: {
      field: string;
      by: "desc" | "asc";
    };
    // 扩展名
    ext?: string | "jpg" | "png" | "jpeg" | "gif" | "webp";
    // 评级
    star?: number;
    // 回收站 删除
    isDeleted?: boolean;
    // 需要包含返回的字段
    includes?: ("tags" | "folders")[];
  }
}
