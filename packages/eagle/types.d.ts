export const SUPPORT_EXT = ["jpg", "png", "jpeg", "gif", "webp", "mp4"];

export type SupportExt = (typeof SUPPORT_EXT)[number];

export interface Metadata {
  id: string;
  name: string;
  size: number;
  btime: Date;
  mtime: Date;
  ext: string;
  url: SupportExt;
  annotation: string;
  modificationTime: Date;
  width: number;
  height: number;
  palettes: string;
  lastModified: Date;
  isDeleted: boolean;
  deletedTime: Date;
  processingPalette: boolean;
  noThumbnail: boolean;
  star: number;
  tags?: string[];
  folders?: string[];
  metadataMTime: Date;
  resolutionWidth?: number;
  resolutionHeight?: number;
  duration?: number;
}

export interface LibraryMetadata {
  folders: Folder[];
  tagsGroups: TagsGroup[];
  modificationTime: number;
  applicationVersion: string;
}

export interface Folder {
  id: string;
  name: string;
  description: string;
  children?: Folder[];
  modificationTime: number;
  tags: string[];
  iconColor?: string;
  password: string;
  passwordTips: string;
}

export interface TagsGroup {
  id: string;
  name: string;
  tags: string[];
}
