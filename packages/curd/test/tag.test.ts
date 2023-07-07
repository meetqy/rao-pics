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

  test<LocalTestContext>("Delete by name", async (ctx) => {
    const { lib } = ctx;
    const tag = await curd.tag.upsert({ name: faker.lorem.word(), libraryId: lib.id });
    await curd.tag.delete({ name: tag.name });
    const tags = await curd.tag.get({ library: lib.name });

    expect(tags).toHaveLength(0);
  });

  test<LocalTestContext>("Delete by libraryId", async (ctx) => {
    const { lib } = ctx;
    await curd.tag.upsert({ name: faker.lorem.word(), libraryId: lib.id });
    await curd.tag.delete({ libraryId: lib.id });
    const tags = await curd.tag.get({ library: lib.name });

    expect(tags).toHaveLength(0);
  });
});
