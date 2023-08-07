/**
 * Hex to rgb, aways return a number divisible by 100
 * @param hex
 * @returns
 */
export const hexToRgb = (hex: string) => {
  if (hex.length !== 7) return NaN;
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
    rgb = [rgb >> 16, (rgb >> 8) & 255, rgb & 255];
  }

  if (rgb.length != 3) return undefined;

  return "#" + rgb.map((c) => ("0" + c.toString(16)).slice(-2)).join("");
};
