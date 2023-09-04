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
});
