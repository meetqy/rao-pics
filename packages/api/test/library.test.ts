import { faker } from "@faker-js/faker";
import { describe, expect, it, test } from "vitest";

import { prisma } from "@acme/db";
import Mock from "@acme/mock";

import { appRouter } from "../src/root";
import { createContext } from "../src/trpc";

describe("@acme/api library", () => {
  const ctx = createContext();
  const caller = appRouter.createCaller(ctx);

  const input = Mock.library();

  // 正常添加
  test("Add normal", async () => {
    await Mock.cleanDB();

    expect(await caller.library.add(input)).toMatchObject(input);
  });

  // 重复添加 dir
  test("Add dir repeatedly", () => {
    void expect(() => caller.library.add(input)).rejects.toThrowError("dir");
  });

  // 带 fileCount 字段
  test("Add with fileCount", async () => {
    await Mock.cleanDB();
    const json = {
      ...input,
      fileCount: faker.number.int({ max: 9999999 }),
    };
    expect(await caller.library.add(json)).toMatchObject(json);
  });

  test("Update", async () => {
    const res = await prisma.library.findFirst();

    if (res) {
      const input = {
        id: res.id,
        fileCount: faker.number.int({ max: 9999999 }),
      };

      expect(await caller.library.update(input)).toMatchObject(input);
    }
  });

  test("Remove", async () => {
    const res = await prisma.library.findFirst();

    if (res) {
      expect(await caller.library.remove(res.id)).toMatchObject(res);
    }
  });
});
