import { describe, expect, it } from "vitest";

import { hexToRgb } from "@acme/util";

import { updateColors } from "./updateColors";

describe("updateColors", () => {
  it("returns the correct parameters when no colors are provided", () => {
    // Define the input data for the test
    const oldColors = [{ rgb: hexToRgb("#ffffff") }, { rgb: hexToRgb("#00ff00") }];

    // Call the function being tested
    const result = updateColors([], oldColors);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: oldColors,
      connect: [],
    });
  });

  it("returns the correct parameters when all colors are new", () => {
    // Define the input data for the test
    const colors = ["#ff0000", "#00ff00"].map((item) => ({ rgb: hexToRgb(item) }));

    // Call the function being tested
    const result = updateColors(colors, []);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: colors,
    });
  });

  it("returns the correct parameters when some colors are new and some are existing", () => {
    // Define the input data for the test
    const colors = ["#ff0000", "#0000ff"].map((item) => ({ rgb: hexToRgb(item) }));
    const oldColors = ["#ff0000", "#999999"].map((item) => ({ rgb: hexToRgb(item) }));

    // Call the function being tested
    const result = updateColors(colors, oldColors);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [{ rgb: hexToRgb("#999999") }],
      connect: colors,
    });
  });

  it("returns the correct parameters when all colors are existing", () => {
    // Define the input data for the test
    const colors = ["#ff0000", "#00ff00"].map((item) => ({ rgb: hexToRgb(item) }));
    const oldColors = ["#ff0000", "#00ff00"].map((item) => ({ rgb: hexToRgb(item) }));

    // Call the function being tested
    const result = updateColors(colors, oldColors);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: colors,
    });
  });
});
