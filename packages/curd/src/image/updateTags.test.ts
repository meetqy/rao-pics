import { describe, expect, it } from "vitest";

import { updateTags } from "./updateTags";

describe("@acme/curd image > updateTags", () => {
  it("returns the correct parameters when no tags are provided", () => {
    // Call the function being tested
    const result = updateTags([], ["Tag 1", "Tag 2"]);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [{ name: "Tag 1" }, { name: "Tag 2" }],
      connect: [],
    });
  });

  it("returns the correct parameters when all tags are new", () => {
    // Call the function being tested
    const result = updateTags(["Tag 1", "Tag 2"], []);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: [{ name: "Tag 1" }, { name: "Tag 2" }],
    });
  });

  it("returns the correct parameters when some tags are new and some are existing", () => {
    // Call the function being tested
    const result = updateTags(["Tag 1", "Tag 3"], ["Tag 1", "Tag 2"]);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [{ name: "Tag 2" }],
      connect: [{ name: "Tag 1" }, { name: "Tag 3" }],
    });
  });

  it("returns the correct parameters when all tags are existing", () => {
    // Call the function being tested
    const result = updateTags(["Tag 1", "Tag 2"], ["Tag 1", "Tag 2"]);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: [{ name: "Tag 1" }, { name: "Tag 2" }],
    });
  });
});
