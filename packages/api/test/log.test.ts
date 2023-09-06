import { beforeEach, describe, expect, it } from "vitest";

import type { LogTypeEnum } from "@rao-pics/constant";
import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("log module", () => {
  beforeEach(async () => {
    // Clear the logs table before each test
    await prisma.log.deleteMany();
  });

  describe("upsert", () => {
    it("should create a new log entry if one does not exist", async () => {
      const input = {
        path: "/test",
        type: "json-error" as LogTypeEnum,
        message: "Test log message",
      };

      const result = await caller.log.upsert(input);

      expect(result.path).toEqual(input.path);
      expect(result.type).toEqual(input.type);
      expect(result.message).toEqual(input.message);

      const dbResult = await prisma.log.findUnique({
        where: { path: input.path },
      });
      expect(dbResult).toEqual(result);
    });

    it("should update an existing log entry if one exists", async () => {
      const existingLog = await prisma.log.create({
        data: {
          path: "/test",
          type: "json-error" as LogTypeEnum,
          message: "Original message",
        },
      });

      const input = {
        path: "/test",
        type: "json-error" as LogTypeEnum,
        message: "Updated message",
      };

      const result = await caller.log.upsert(input);

      expect(result.path).toEqual(input.path);
      expect(result.type).toEqual(input.type);
      expect(result.message).toEqual(input.message);

      const dbResult = await prisma.log.findUnique({
        where: { path: input.path },
      });
      expect(dbResult).toEqual(result);
      expect(dbResult?.path).toEqual(existingLog.path);
    });
  });

  describe("delete", () => {
    it("should delete a log entry if it exists", async () => {
      const existingLog = await prisma.log.create({
        data: {
          path: "/test",
          type: "json-error" as LogTypeEnum,
          message: "Test log message",
        },
      });

      const result = await caller.log.delete(existingLog.path);

      expect(result.count).toEqual(1);

      const dbResult = await prisma.log.findUnique({
        where: { path: existingLog.path },
      });
      expect(dbResult).toBeNull();
    });

    it("should not throw an error if the log entry does not exist", async () => {
      const result = await caller.log.delete("/nonexistent");

      expect(result.count).toEqual(0);
    });
  });

  describe("get", () => {
    beforeEach(async () => {
      await prisma.log.deleteMany();
    });

    it("limit 20", async () => {
      for (let i = 0; i < 50; i++) {
        await caller.log.upsert({
          path: `/aaa/a${i + 1}`,
          type: "json-error",
          message: "json-error",
        });
      }

      const res1 = await caller.log.get({ limit: 20 });
      expect(res1.data.length).toEqual(20);
      expect(res1.nextCursor).toEqual("/aaa/a21");
      const res2 = await caller.log.get({ limit: 20, cursor: res1.nextCursor });
      expect(res2.data.length).toEqual(20);
      expect(res2.nextCursor).toEqual("/aaa/a41");
    });

    it("keywords", async () => {
      for (let i = 0; i < 50; i++) {
        if (i < 20) {
          await caller.log.upsert({
            path: `/aaa/a${i + 1}`,
            type: "json-error",
            message: "json-error",
          });
        } else if (i >= 20 && i < 40) {
          await caller.log.upsert({
            path: `/bbb/b${i + 1}`,
            type: "unknown",
            message: "unknown",
          });
        } else {
          await caller.log.upsert({
            path: `/ccc/c${i + 1}`,
            type: "unsupported-ext",
            message: "unsupported-ext",
          });
        }
      }

      const res1 = await caller.log.get({ limit: 20, keywords: "aaa" });
      expect(res1.data.length).toEqual(20);
      expect(res1.nextCursor).toBeUndefined();
      const res2 = await caller.log.get({ limit: 20, keywords: "unknown" });
      expect(res2.data.length).toEqual(20);
      expect(res2.nextCursor).toBeUndefined();
      const res3 = await caller.log.get({ limit: 20, keywords: "22" });
      expect(res3.data.length).toEqual(1);
    });
  });
});
