import { homedir } from "os";
import { join } from "path";

/**
 * hex to Rgb
 * @param hex
 * @returns
 */
export const hexToRgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return Math.ceil(n / 100) * 100;
};

/**
 * Color rgb to hex
 * @param rgb
 * @returns
 */
export const rgbToHex = (rgb: number[] | number) => {
  if (typeof rgb === "number") {
    return "#" + rgb.toString(16);
  }

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const [r, g, b] = rgb;
  if (!r || !g || !b) return;

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

/**
 * Cache dir
 */
export const getCacheDir = () => {
  const cache: { [key in typeof process.platform]?: string } = {
    darwin: join(homedir(), `/Library/Caches/Rao\ Pics`),
    win32: join(homedir(), `/AppData/Local/Rao\ Pics`),
    linux: join(homedir(), `/.cache/Rao\ Pics`),
  };

  return cache[process.platform] || join(homedir(), `Rao\ Pics`);
};

/**
 * Thumbnail dir cache
 */
export const thumbnailDirCache = join(getCacheDir(), "thumbnail");
