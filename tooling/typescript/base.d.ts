export {};

declare global {
  interface ProcessEnv {
    /**
     * App 版本号 (apps/electron => package.json 中的 version)
     */
    APP_VERSION: string;
  }

  interface ReadonlyArray<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(
      searchElement: any,
      fromIndex?: number,
    ): searchElement is ReadonlyArray<T>[number];
  }

  type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;

  interface Metadata {
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
    duration: number;
    lastModified: number;
    noThumbnail?: boolean;
    palettes: MetadataPalette[];
  }

  interface MetadataPalette {
    color: number[];
    ratio: number;
    $$hashKey?: string;
  }
}
