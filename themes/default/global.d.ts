declare namespace EagleUse {
  export type PrismaImage = import("@eagleuse/prisma-client").Image;
  export type Tag = import("@eagleuse/prisma-client").Tag;
  export type Folder = import("@eagleuse/prisma-client").Folder;

  export type Menu = "/" | "/tags" | "/not-tag" | "recycle" | "/folder/";

  // 图片
  export interface Image extends PrismaImage {
    tags: Tag[];
    folders: Folder[];
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

  type Ext = "jpg" | "png" | "jpeg" | "gif" | "webp";

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
    ext?: string | Ext;
    // 评级
    star?: number;
    // 回收站 删除
    isDeleted?: boolean;
    // 需要包含返回的字段
    includes?: ("tags" | "folders")[];
  }
}
