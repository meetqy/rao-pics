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
