import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";

import { prisma, type Library } from "@acme/db";
import Mock from "@acme/mock";

import curd from "../index";

interface LocalTestContext {
  lib: Library[];
  input: {
    id: string;
    name: string;
    libraryId: number;
  };
}

const createLib = () =>
  prisma.library.create({
    data: {
      id: faker.number.int({ max: 9999999 }),
      name: faker.lorem.word(),
      dir: faker.system.filePath(),
      fileCount: faker.number.int({ max: 9999999 }),
      type: "eagle",
    },
  });

const createInput = (libraryId: number) => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  libraryId,
});

beforeEach<LocalTestContext>(async (ctx) => {
  await Mock.dbClean();

  const lib = await prisma.$transaction([createLib(), createLib(), createLib()]);

  ctx.lib = lib;
  ctx.input = createInput(lib[0]?.id);
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
    const { input, lib } = ctx;

    const libId = lib[0]?.id;

    if (libId) {
      expect(await curd.folder.upsert(input)).toMatchObject(input);
      expect(await curd.folder.get({ library: libId })).toHaveLength(1);
    }
  });

  test<LocalTestContext>("Get folder by name", async (ctx) => {
    const { lib } = ctx;

    const libName = lib[0]?.name;
    const libId = lib[0]?.id;

    if (libName && libId) {
      // 创建 3 条 folder
      await prisma.$transaction(lib.map(() => curd.folder.upsert(createInput(libId))));

      expect(await curd.folder.get({ library: libName })).toHaveLength(3);
    }
  });

  test<LocalTestContext>("Get folder by id", async (ctx) => {
    const { lib } = ctx;

    const libName = lib[0]?.name;
    const libId = lib[0]?.id;

    if (libName && libId) {
      // 创建 3 条 folder
      await prisma.$transaction(lib.map(() => curd.folder.upsert(createInput(libId))));
      await curd.folder.upsert(createInput(lib[1]?.id || 0));

      expect(await curd.folder.get({ library: libId })).toHaveLength(3);
    }
  });

  test<LocalTestContext>("Delete folder 'in' by LibraryId and ids", async (ctx) => {
    const { lib } = ctx;

    const libId = lib[0]?.id;

    if (libId) {
      // 创建 3 条 folder
      const folders = await prisma.$transaction(lib.map(() => curd.folder.upsert(createInput(libId))));

      await curd.folder.delete({ libraryId: libId, ids: folders.map((item) => item.id || "") });

      expect(await curd.folder.get({ library: libId })).toHaveLength(0);
    }
  });

  test<LocalTestContext>("Delete folder 'notIn' by LibraryId and ids", async (ctx) => {
    const { lib } = ctx;

    const libId = lib[0]?.id;

    if (libId) {
      // 创建 3 条 folder
      const folders = await prisma.$transaction(lib.map(() => curd.folder.upsert(createInput(libId))));

      await curd.folder.delete({ libraryId: libId, ids: folders.map((item) => item.id || ""), idsRule: "notIn" });

      expect(await curd.folder.get({ library: libId })).toHaveLength(3);
    }
  });
});
