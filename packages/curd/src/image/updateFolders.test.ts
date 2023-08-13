import { describe, expect, it } from "vitest";

import { updateFolders } from "./updateFolders";

describe("updateFolders", () => {
  it("returns the correct parameters when no folders are provided", () => {
    // Define the input data for the test
    const folders: { id: string }[] = [];
    const oldFolders = [{ id: "1" }, { id: "2" }];

    // Call the function being tested
    const result = updateFolders(folders, oldFolders);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [{ id: "1" }, { id: "2" }],
      connect: [],
    });
  });

  it("returns the correct parameters when all folders are new", () => {
    // Define the input data for the test
    const folders = [{ id: "1" }, { id: "2" }];
    const oldFolders: { id: string }[] = [];

    // Call the function being tested
    const result = updateFolders(folders, oldFolders);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: [{ id: "1" }, { id: "2" }],
    });
  });

  it("returns the correct parameters when some folders are new and some are existing", () => {
    // Define the input data for the test
    const folders = [{ id: "1" }, { id: "3" }];
    const oldFolders = [{ id: "1" }, { id: "2" }];

    // Call the function being tested
    const result = updateFolders(folders, oldFolders);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [{ id: "2" }],
      connect: [{ id: "1" }, { id: "3" }],
    });
  });

  it("returns the correct parameters when all folders are existing", () => {
    // Define the input data for the test
    const folders = [{ id: "1" }, { id: "2" }];
    const oldFolders = [{ id: "1" }, { id: "2" }];

    // Call the function being tested
    const result = updateFolders(folders, oldFolders);

    // Assert that the result is correct
    expect(result).toEqual({
      disconnect: [],
      connect: [{ id: "1" }, { id: "2" }],
    });
  });
});
