import { join } from "path";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { getCaller } from "..";
import { syncFolder } from "../src/sync";

describe("folder module", () => {
  beforeEach(async () => {
    await prisma.folder.deleteMany();
  });

  afterAll(async () => {
    await prisma.folder.deleteMany();
  });

  it("syncFolder", async () => {
    const _caller = getCaller();
    await syncFolder(join(__dirname, "..", "mocks", "folder.json"));

    // 有密码的文件夹 show 为 false, 只会返回无密码文件夹
    expect(await prisma.folder.count()).toBe(4);
    expect(await prisma.folder.count({ where: { pid: "LKRVQVLHGERAX" } })).toBe(
      1,
    );
  });
});
