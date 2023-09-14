import { describe, expect, it } from "vitest";

import { hexToNumber, numberToHex, rgbToHex, rgbToNumber } from "../src";

describe("hexToNumber", () => {
  it("should convert a hex string to a number", () => {
    expect(hexToNumber("#ff0000")).toBe(16711680);
    expect(hexToNumber("#00ff00")).toBe(65280);
    expect(hexToNumber("#0000ff")).toBe(255);
  });

  it("should handle lowercase hex strings", () => {
    expect(hexToNumber("#ff00ff")).toBe(16711935);
    expect(hexToNumber("#00ffff")).toBe(65535);
    expect(hexToNumber("#000000")).toBe(0);
    expect(hexToNumber("000000")).toBe(0);
  });

  it("should handle invalid hex strings", () => {
    expect(hexToNumber("#gggggg")).toBeNaN();
  });
});

describe("rgbToHex", () => {
  it("should convert an RGB color to a hex string", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
    expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
  });

  it("should handle values outside the 0-255 range", () => {
    expect(rgbToHex(300, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, -50, 0)).toBe("#000000");
    expect(rgbToHex(0, 0, 500)).toBe("#0000ff");
  });

  it("should handle single-digit hex values", () => {
    expect(rgbToHex(16, 32, 48)).toBe("#102030");
    expect(rgbToHex(255, 255, 0)).toBe("#ffff00");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });
});

describe("numberToHex", () => {
  it("should convert a number to a hex string", () => {
    expect(numberToHex(255)).toBe("#ffffff");
    expect(numberToHex(0)).toBe("#0fffff");
    expect(numberToHex(128)).toBe("#80ffff");
  });

  it("should handle values outside the 0-255 range", () => {
    expect(numberToHex(-1)).toBe("#000000");
    expect(numberToHex(256)).toBe("#100fff");
    expect(numberToHex(500)).toBe("#1f4fff");
  });
});

describe("rgbToNumber", () => {
  it("should convert an RGB color to a number", () => {
    expect(rgbToNumber([255, 0, 0])).toBe(16711680);
    expect(rgbToNumber([0, 255, 0])).toBe(65280);
    expect(rgbToNumber([0, 0, 255])).toBe(255);
  });

  it("should handle missing values", () => {
    expect(rgbToNumber([255, 0])).toBe(16711680);
    expect(rgbToNumber([0])).toBe(0);
    expect(rgbToNumber([])).toBe(0);
  });

  it("should handle values outside the 0-255 range", () => {
    expect(rgbToNumber([300, 0, 0])).toBe(16711680);
    expect(rgbToNumber([0, -50, 0])).toBe(0);
    expect(rgbToNumber([0, 0, 500])).toBe(255);
  });
});
