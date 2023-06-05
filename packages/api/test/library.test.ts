import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { prisma } from "@acme/db";
import Mock from "@acme/mock";

import { appRouter, type AppRouter } from "../src/root";
import { createContext } from "../src/trpc";

describe("@acme/api library", () => {
  const ctx = createContext();
  const caller = appRouter.createCaller(ctx);

  test("add", async () => {
    await Mock.cleanDB();

    type Input = inferProcedureInput<AppRouter["library"]["add"]>;
    const input: Input = {
      name: "test.library",
      dir: "/User/aaa/bb",
      type: "eagle",
    };

    // 添加
    expect(await caller.library.add(input)).toMatchObject(input);

    // 重复添加 dir 唯一
    void expect(() => caller.library.add(input)).rejects.toThrowError("dir");
  });

  test("update", async () => {
    const res = await prisma.library.findFirst();
    type Input = inferProcedureInput<AppRouter["library"]["update"]>;

    if (res) {
      const input: Input = {
        id: res.id,
        fileCount: 232,
      };

      expect(await caller.library.update(input)).toMatchObject(input);
    }
  });

  test("remove", async () => {
    const res = await prisma.library.findFirst();
    type Input = inferProcedureInput<AppRouter["library"]["remove"]>;

    if (res) {
      const input: Input = res.id;

      expect(await caller.library.remove(input)).toMatchObject(res);
    }
  });
});
