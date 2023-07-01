import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import Mock from "@acme/mock";

import curd from "..";

describe("@acme/curd pending", async () => {
  await Mock.dbClean();

  const lib = await curd.library.create({
    type: "eagle",
    name: faker.system.fileName(),
    dir: faker.system.filePath(),
    fileCount: faker.number.int({ max: 9999999 }),
  });

  test("Create pending image", async () => {
    const input = {
      path: faker.system.filePath(),
      libraryId: lib.id,
    };

    const res = await curd.pending.upsert({
      ...input,
      type: "create",
    });

    expect(res).toMatchObject(input);
    expect(res.type).toBe("create");
  });

  test("Create pending image, and path is exist, and get by library id.", async () => {
    const input = {
      path: faker.system.filePath(),
      libraryId: lib.id,
    };

    await curd.pending.upsert({
      ...input,
      type: "create",
    });
    await curd.pending.upsert({
      ...input,
      type: "create",
    });

    const res = await curd.pending.get({
      libraryId: lib.id,
    });

    expect(res).toHaveLength(2);
  });

  test("Delete pending image", async () => {
    const res = await curd.pending.get({
      libraryId: lib.id,
    });

    const p = res[0]?.path;
    if (p) {
      const res = await curd.pending.delete(p);
      expect(res).toHaveProperty("path", p);
      void expect(curd.pending.get({ libraryId: lib.id })).resolves.toHaveLength(1);
    }
  });
});
