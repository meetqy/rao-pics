import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("tag module", () => {
  beforeEach(async () => {
    await prisma.tag.deleteMany();
  });

  describe("upsert", () => {
    it("creates a new tag", async () => {
      const input = "test tag";
      const result = await caller.tag.upsert(input);

      expect(result.name).toEqual(input);

      const dbTag = await prisma.tag.findUnique({
        where: { name: input },
      });
      expect(dbTag).toBeDefined();
      expect(dbTag!.name).toEqual(input);
    });

    it("throws an error if the tag already exists", async () => {
      const input = "test tag";
      await caller.tag.upsert(input);
      await caller.tag.upsert(input);

      expect(await prisma.tag.findMany({})).toHaveLength(1);
    });
  });

  describe("delete", () => {
    it("deletes an existing tag", async () => {
      const input = "test tag";
      await caller.tag.upsert(input);
      await caller.tag.delete(input);

      const dbTag = await prisma.tag.findUnique({
        where: { name: input },
      });
      expect(dbTag).toBeNull();
    });

    it("throws an error if the tag does not exist", async () => {
      const input = "test tag";
      const res = await caller.tag.delete(input);
      expect(res.count).toEqual(0);
    });
  });
});
