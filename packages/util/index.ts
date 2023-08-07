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
    return "#" + rgb.toString(16).padEnd(6, "0");
  }

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const [r, g, b] = rgb;
  if (!r || !g || !b) return;

  const hex = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

  return hex;
};
