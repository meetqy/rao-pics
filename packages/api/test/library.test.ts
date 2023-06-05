import { faker } from "@faker-js/faker";
import { describe, expect, it, test } from "vitest";

import { prisma } from "@acme/db";
import Mock from "@acme/mock";

import { appRouter } from "../src/root";
import { createContext } from "../src/trpc";

describe("@acme/api library", () => {
  const ctx = createContext();
  const caller = appRouter.createCaller(ctx);

  test("add", async () => {
    await Mock.cleanDB();

    const input = Mock.library();

    // 正常添加
    it("normal", async () => {
      expect(await caller.library.add(input)).toMatchObject(input);
    });

    // 重复添加 dir
    it("repeatedly add", () => {
      void expect(() => caller.library.add(input)).rejects.toThrowError("dir");
    });

    // 带 fileCount 字段
    it("with fileCount", async () => {
      const json = {
        ...input,
        fileCount: faker.number.int({ max: 9999999 }),
      };
      expect(await caller.library.add(json)).toMatchObject(json);
    });
  });

  test("update", async () => {
    const res = await prisma.library.findFirst();

    if (res) {
      const input = {
        id: res.id,
        fileCount: faker.number.int({ max: 9999999 }),
      };

      expect(await caller.library.update(input)).toMatchObject(input);
    }
  });

  test("remove", async () => {
    const res = await prisma.library.findFirst();

    if (res) {
      expect(await caller.library.remove(res.id)).toMatchObject(res);
    }
  });
});
