import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";
import { syncFolder } from "../src/sync";

const caller = router.createCaller({});

describe("folder module", () => {
  beforeEach(async () => {
    await prisma.folder.deleteMany();
  });

  afterAll(async () => {
    await prisma.folder.deleteMany();
  });

  it("syncFolder", async () => {
    const input = [
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
    ];
    await syncFolder(input, caller);

    expect(await caller.folder.get()).toHaveLength(4);
    expect(await caller.folder.get({ pid: "LKRVQVLHGERAX" })).toHaveLength(1);
  });
});
