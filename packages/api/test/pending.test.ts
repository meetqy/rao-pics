import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import type { PendingTypeEnum } from "..";
import { router } from "..";

const caller = router.createCaller({});

describe("pending module", () => {
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await prisma.pending.deleteMany({});
  });

  describe("create", () => {
    it("creates a new pending item", async () => {
      const input = {
        path: "/api/users/123",
        type: "create" as PendingTypeEnum,
      };

      const result = await caller.pending.create(input);

      expect(result).toMatchObject({
        path: input.path,
        type: input.type,
      });

      const dbItem = await caller.pending.get(result.path);

      expect(dbItem).toMatchObject({
        path: input.path,
        type: input.type,
      });
    });

    it("throws an error if input is invalid", async () => {
      const input = {
        path: "/api/users/123",
        type: "invalid" as never,
      };

      await expect(caller.library.add(input as never)).rejects.toMatchObject({
        code: "BAD_REQUEST",
      });
    });
  });

  describe("get", () => {
    beforeEach(async () => {
      await caller.pending.create({ path: "/api/users/123", type: "create" });
      await caller.pending.create({ path: "/api/users/456", type: "update" });
      await caller.pending.create({ path: "/api/users/789", type: "delete" });
    });

    it("returns all pending items if no input is provided", async () => {
      const result = await caller.pending.get();

      expect(result).toHaveLength(3);
    });

    it("returns only matching pending items if input is provided", async () => {
      const result = await caller.pending.get("/api/users/123");

      expect(result).toMatchObject({
        path: "/api/users/123",
        type: "create",
      });
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await caller.pending.create({ path: "/api/users/123", type: "create" });
      await caller.pending.create({ path: "/api/users/456", type: "update" });
      await caller.pending.create({ path: "/api/users/789", type: "delete" });
    });

    it("deletes a pending item", async () => {
      await caller.pending.delete("/api/users/123");

      const result = await caller.pending.get();

      expect(result).toHaveLength(2);
    });
  });
});
