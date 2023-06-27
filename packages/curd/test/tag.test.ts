import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";

import { type Library } from "@acme/db";

import curd from "..";

interface LocalTestContext {
  lib: Library;
}

describe("@acme/curd tag", () => {
  beforeEach<LocalTestContext>(async (ctx) => {
    ctx.lib = await curd.library.create({
      type: "eagle",
      name: faker.system.fileName(),
      dir: faker.system.filePath(),
      fileCount: faker.number.int({ max: 9999999 }),
    });
  });

  test<LocalTestContext>("Upsert tag, but libraryId not exits", () => {
    void expect(() => curd.tag.upsert({ name: faker.lorem.word(), libraryId: faker.number.int({ max: 1000 }) })).rejects.toThrowError();
  });

  test<LocalTestContext>("Upsert tag create", async (ctx) => {
    const { lib } = ctx;

    const tag = await curd.tag.upsert({ name: faker.lorem.word(), libraryId: lib.id });

    expect(tag).toMatchObject({
      name: tag.name,
      libraryId: lib.id,
    });
  });
});
