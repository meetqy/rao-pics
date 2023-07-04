import { CONSTANT, type Constant } from "@acme/constant";

export const SUPPORT_EXT = CONSTANT.EXT;

/**
 * 当前同步的状态
 */
export type EmitOption = {
  type: "image" | "folder";
  current: number;
  failCount: number;
};

export interface Metadata {
  id: string;
  name: string;
  size: number;
  btime: number;
  mtime: number;
  ext: Constant["ext"] | string;
  url: string;
  annotation: string;
  modificationTime: number;
  width: number;
  height: number;
  palettes: {
    color: number[];
    ratio: number;
  }[];
  lastModified: number;
  isDeleted: boolean;
  deletedTime?: number;
  processingPalette?: boolean;
  noThumbnail: boolean;
  star?: number;
  tags?: string[];
  folders?: string[];
  resolutionWidth?: number;
  resolutionHeight?: number;
  duration?: number;
}

export interface LibraryMetadata {
  folders: Folder[];
  modificationTime: number;
  applicationVersion: string;
}

export interface Folder {
  id: string;
  name: string;
  children?: Folder[];
}
