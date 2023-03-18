declare namespace EagleUse {
  export type PrismaImage = import("@eagleuse/prisma-client").Image;
  export type TagsGroup = import("@eagleuse/prisma-client").TagsGroups;
  export type Tag = import("@eagleuse/prisma-client").Tag;
  export type Folder = import("@eagleuse/prisma-client").Folder;
  export type Menu = "/" | "/tags" | "/not-tag" | "recycle" | "/folder/";

  export interface FolderTree extends Folder {
    children: FolderTree[];
    images?: Image[];
    _count?: { images: number };
  }

  export interface TagWithCountImage extends EagleUse.Tag {
    _count: {
      images: number;
    };
  }

  // 图片
  export interface Image extends PrismaImage {
    tags?: Tag[];
    folders: Folder[];
  }

  export interface ImagePalette {
    color: number[];
    ratio: number;
    $$hashKey: string;
  }

  type Ext = "jpg" | "png" | "jpeg" | "gif" | "webp";
}
