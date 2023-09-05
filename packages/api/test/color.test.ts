import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";
import { rgbToNumberMutilple100 } from "../src/color";

const caller = router.createCaller({});

describe("color module", () => {
  describe("upsert", () => {
    beforeEach(async () => {
      await prisma.color.deleteMany({});
    });

    it("should create a new color", async () => {
      const result = await caller.color.upsert([255, 0, 0]);
      expect(result).toHaveProperty("rgb", rgbToNumberMutilple100([255, 0, 0]));
    });

    it("should update an existing color", async () => {
      const input = [255, 0, 0];
      const result1 = await caller.color.upsert(input);
      const result2 = await caller.color.upsert(input);
      expect(result1).toHaveProperty("rgb", rgbToNumberMutilple100(input));
      expect(result2).toHaveProperty("rgb", rgbToNumberMutilple100(input));
      expect(result1).toEqual(result2);
    });
  });

  describe("delete", () => {
    beforeEach(async () => {
      await prisma.color.deleteMany({});
    });

    it("should delete an existing color", async () => {
      await caller.color.upsert([255, 0, 0]);
      const result = await caller.color.delete([255, 0, 0]);
      expect(result).toHaveProperty("count", 1);
    });

    it("should return undefined for non-existing color", async () => {
      const result = await caller.color.delete([255, 0, 0]);
      expect(result).toHaveProperty("count", 0);
    });
  });
});
