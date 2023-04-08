import { Image, Tag } from "@raopics/prisma-client";
export interface Metadata {
  id: string;
  name: string;
  size: number;
  btime: number;
  mtime: number;
  ext: string;
  url: string;
  annotation: string;
  modificationTime: number;
  width: number;
  height: number;
  palettes: string;
  lastModified: number;
  isDeleted: boolean;
  deletedTime: number;
  processingPalette: boolean;
  noThumbnail: boolean;
  star: number;
  nsfw: boolean;
  tags?: string[];
  folders?: string[];
  metadataMTime: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  duration?: string;
}

export type TransformBeforeArgs = {
  // newData 未处理的 metadata
  metadata: Metadata;
  // oldData 数据库中的 metadata
  database:
    | (Image & {
        tags: Tag[];
      })
    | null;
};

export interface Transform {
  before?: (args: TransformBeforeArgs) => Metadata | Promise<Metadata>;
}
