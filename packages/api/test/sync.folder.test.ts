import { describe, expect, it } from "vitest";

import folderMock from "../mocks/folder.json";
import { handleFolder, treeToFlat } from "../src/sync/folder";

describe("handle folder by path", () => {
  it("should return a folder tree", () => {
    const flat = handleFolder("mocks/folder.json");
    expect(flat).toEqual([
      { name: "期刊", id: "LKRVQVLHGERAX", description: "", pid: undefined },
      {
        name: "04",
        id: "LLTF4ZITJSWSS",
        description: "",
        pid: "LKRVQVLHGERAX",
      },
      { name: "套图", id: "LLNP0K49I63ZA", description: "", pid: undefined },
      {
        name: "08",
        id: "LLWCB0OZM5GZ3",
        description: "",
        pid: "LLNP0K49I63ZA",
      },
    ]);
  });

  it("error path", () => {
    expect(() => {
      handleFolder("mocks/folder2.json");
    }).toThrowError();
  });
});

describe("folder tree to flat", () => {
  it("should return a flat array", () => {
    const flat = treeToFlat(folderMock.folders as never);
    expect(flat).toEqual([
      { name: "期刊", id: "LKRVQVLHGERAX", description: "", pid: undefined },
      {
        name: "04",
        id: "LLTF4ZITJSWSS",
        description: "",
        pid: "LKRVQVLHGERAX",
      },
      { name: "套图", id: "LLNP0K49I63ZA", description: "", pid: undefined },
      {
        name: "08",
        id: "LLWCB0OZM5GZ3",
        description: "",
        pid: "LLNP0K49I63ZA",
      },
    ]);
  });
});
