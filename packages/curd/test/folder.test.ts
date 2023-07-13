import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";

import { prisma, type Library } from "@acme/db";

import curd from "../index";

interface LocalTestContext {
  lib: Library;
  input: {
    id: string;
    name: string;
    libraryId: number;
  };
}

const createLib = () =>
  curd.library.create({
    name: faker.lorem.word(),
    dir: faker.system.filePath(),
    type: "eagle",
  });

const createInput = (libraryId: number) => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  libraryId,
});

beforeEach<LocalTestContext>(async (ctx) => {
  await curd.util.dbClean();

  const lib = await createLib();

  ctx.lib = lib;
  ctx.input = createInput(lib.id);
});

describe("@acme/curd folder", () => {
  test<LocalTestContext>("Upsert folder, but libraryId not exits", (ctx) => {
    const { input } = ctx;

    void expect(() => curd.folder.upsert({ ...input, libraryId: -1000 })).rejects.toThrowError();
  });

  test<LocalTestContext>("Upsert folder create", async (ctx) => {
    const { input } = ctx;

    expect(await curd.folder.upsert(input)).toMatchObject(input);
  });

  test<LocalTestContext>("Upsert folder update", async (ctx) => {
    const { input } = ctx;

    expect(await curd.folder.upsert(input)).toMatchObject(input);
  });

  test<LocalTestContext>("Get folder by libraryId or id", async (ctx) => {
    const { lib } = ctx;

    // 创建 3 条 folder
    const folders = await prisma.$transaction([1, 2, 3].map(() => curd.folder.upsert(createInput(lib.id))));

    void expect(curd.folder.get({ libraryId: lib.id })).resolves.toHaveLength(3);
    void expect(curd.folder.get({ id: folders[0]?.id })).resolves.toHaveLength(1);
  });

  test<LocalTestContext>("Delete folder by id", async (ctx) => {
    const { lib } = ctx;

    const folders = await prisma.$transaction([1, 2, 3].map(() => curd.folder.upsert(createInput(lib.id))));
    await curd.folder.delete({ id: folders[0]?.id });

    expect(await curd.folder.get({ libraryId: lib.id })).toHaveLength(2);
  });

  test<LocalTestContext>("Delete folder by libraryId.", async (ctx) => {
    const { lib } = ctx;

    await prisma.$transaction([1, 2, 3].map(() => curd.folder.upsert(createInput(lib.id))));
    await curd.folder.delete({ libraryId: lib.id });

    expect(await curd.folder.get({ libraryId: lib.id })).toHaveLength(0);
  });

  // TODO: test get by imageId
});
