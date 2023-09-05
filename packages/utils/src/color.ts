export const hexToNumber = (hex: string) =>
  parseInt(hex.replace("#", "").padEnd(6, "0"), 16);

export const rgbToHex = (r: number, g: number, b: number) => {
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;

  const red = r.toString(16).padStart(2, "0");
  const green = g.toString(16).padStart(2, "0");
  const blue = b.toString(16).padStart(2, "0");
  return `#${red}${green}${blue}`;
};

export const numberToHex = (num: number) => {
  num = num > 255 ? 255 : num < 0 ? 0 : num;

  const hex = num.toString(16);
  return "#" + (hex.length === 1 ? `0${hex}` : hex).padEnd(6, "0");
};

export const rgbToNumber = (rgb: number[]) => {
  const [r = 0, g = 0, b = 0] = rgb;
  return hexToNumber(rgbToHex(r, g, b));
};
