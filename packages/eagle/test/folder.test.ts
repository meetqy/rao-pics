import { describe, expect, it } from "vitest";

import folderMock from "../mocks/folder.json";
import { treeToFlat } from "../src/folder";

describe("folder tree to flat", () => {
  it("should return a flat array", () => {
    const flat = treeToFlat(folderMock);
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
