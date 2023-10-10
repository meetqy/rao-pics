import { join } from "path";
import { describe, expect, it } from "vitest";

import folderMock from "../mocks/folder.json";
import { handleFolder, treeToFlat } from "../src/sync/folder";

const mockjson = join(__dirname, "../mocks/folder.json");

describe("handle folder by path", () => {
  it("should return a folder tree", () => {
    const flat = handleFolder(mockjson);
    expect(flat).toEqual([
      {
        name: "期刊",
        id: "LKRVQVLHGERAX",
        description: "",
        pid: undefined,
        password: "",
        passwordTips: "",
      },
      {
        name: "04",
        id: "LLTF4ZITJSWSS",
        description: "",
        pid: "LKRVQVLHGERAX",
        password: "1234",
        passwordTips: "1234",
      },
      {
        name: "套图",
        id: "LLNP0K49I63ZA",
        description: "",
        pid: undefined,
        password: "",
        passwordTips: "",
      },
      {
        name: "08",
        id: "LLWCB0OZM5GZ3",
        description: "",
        pid: "LLNP0K49I63ZA",
        password: "",
        passwordTips: "",
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
      {
        name: "期刊",
        id: "LKRVQVLHGERAX",
        description: "",
        pid: undefined,
        password: "",
        passwordTips: "",
      },
      {
        name: "04",
        id: "LLTF4ZITJSWSS",
        description: "",
        pid: "LKRVQVLHGERAX",
        password: "1234",
        passwordTips: "1234",
      },
      {
        name: "套图",
        id: "LLNP0K49I63ZA",
        description: "",
        pid: undefined,
        password: "",
        passwordTips: "",
      },
      {
        name: "08",
        id: "LLWCB0OZM5GZ3",
        description: "",
        pid: "LLNP0K49I63ZA",
        password: "",
        passwordTips: "",
      },
    ]);
  });
});
