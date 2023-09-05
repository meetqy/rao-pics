import { describe, expect, it } from "vitest";

import { hexToNumber, numberToHex, rgbToHex } from "../src";

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
  it("should convert RGB values to a hex string", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
    expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
  });

  it("should handle values outside the RGB range", () => {
    expect(rgbToHex(300, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, -50, 0)).toBe("#000000");
    expect(rgbToHex(0, 0, 500)).toBe("#0000ff");
  });
});

describe("numberToHex", () => {
  it("should convert a number to a hex string", () => {
    expect(numberToHex(255)).toBe("#ff0000");
    expect(numberToHex(0)).toBe("#000000");
    expect(numberToHex(128)).toBe("#800000");
  });

  it("should handle values outside the 0-255 range", () => {
    expect(numberToHex(-1)).toBe("#000000");
    expect(numberToHex(256)).toBe("#ff0000");
    expect(numberToHex(500)).toBe("#ff0000");
  });
});
