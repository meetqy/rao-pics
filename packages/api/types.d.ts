export interface Metadata {
  id: string;
  name: string;
  size: number;
  btime: number;
  mtime: number;
  ext: string;
  tags: string[];
  folders: string[];
  isDeleted: boolean;
  url: string;
  annotation: string;
  modificationTime: number;
  height: number;
  width: number;
  lastModified: number;
  palettes: Palette[];
}

export interface Palette {
  color: number[];
  ratio: number;
  $$hashKey?: string;
}

declare global {
  namespace NodeJS {
    interface Process {
      /** @type Electron process.resourcesPath */
      resourcesPath: string;
    }
  }
}
