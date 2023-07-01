import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";

import { type Library } from "@acme/db";
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

    const res = await curd.pending.upsert(input);

    expect(res).toMatchObject(input);
  });

  test("Create pending image, and path is exist.", async () => {
    const input = {
      path: faker.system.filePath(),
      libraryId: lib.id,
    };

    await curd.pending.upsert(input);
    await curd.pending.upsert(input);
    const res = await curd.pending.get({
      libraryId: lib.id,
    });

    expect(res).toHaveLength(2);
  });
});
