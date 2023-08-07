import { describe, expect, it } from "vitest";

import { hexToRgb, rgbToHex } from "../index";

describe("@acme/util color hexToRgb", () => {
  it("should return 0 for invalid hex input", () => {
    expect(hexToRgb("#12345")).toBe(NaN);
    expect(hexToRgb("#1234567")).toBe(NaN);
    expect(hexToRgb("123456")).toBe(NaN);
    expect(hexToRgb("")).toBe(NaN);
  });

  it("should return a number divisible by 100 for valid hex input", () => {
    expect(hexToRgb("#000000")).toBe(0);
    expect(hexToRgb("#ffffff")).toBe(16777300);
    expect(hexToRgb("#ff0000")).toBe(16711700);
    expect(hexToRgb("#00ff00")).toBe(65300);
    expect(hexToRgb("#0000ff")).toBe(300);
  });

  it("should convert #f5f5f[x] to 16119300", () => {
    ["#f5f5f1", "#f5f5f2", "#f5f5f3", "#f5f5f4", "#f5f5f5", "#f5f5f6", "#f5f5f7", "#f5f5f8", "#f5f5f9"].forEach((hex) => {
      expect(hexToRgb(hex)).toBe(16119300);
    });
  });
});

describe("@acme/util color rgbToHex", () => {
  it("should convert [255, 0, 0] to #ff0000", () => {
    expect(rgbToHex([255, 0, 0])).toEqual("#ff0000");
  });

  it("should convert [0, 255, 0] to #00ff00", () => {
    expect(rgbToHex([0, 255, 0])).toEqual("#00ff00");
  });

  it("should convert [0, 0, 255] to #0000ff", () => {
    expect(rgbToHex([0, 0, 255])).toEqual("#0000ff");
  });

  it("should convert [255, 255, 255] to #ffffff", () => {
    expect(rgbToHex([255, 255, 255])).toEqual("#ffffff");
  });

  it("should convert 16711680 to #ff0000", () => {
    expect(rgbToHex(16711680)).toEqual("#ff0000");
  });

  //   it("should convert 16119281 to #ff0000", () => {
  //     expect(rgbToHex(16119281)).toEqual("#ff0000");
  //   });

  it("should return undefined for invalid input", () => {
    expect(rgbToHex([])).toBeUndefined();
    expect(rgbToHex([255, 0])).toBeUndefined();
  });
});
