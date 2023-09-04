import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";
import { rgbTo16BitHex } from "../src/color";

const caller = router.createCaller({});

describe("rgbTo16BitHex", () => {
  it("should convert rgb to 16-bit hex", () => {
    expect(rgbTo16BitHex([255, 0, 0])).toBe(63500);
    expect(rgbTo16BitHex([0, 0, 0])).toBe(0);
  });
  it("should return undefined for invalid input", () => {
    expect(rgbTo16BitHex([255, 0])).toBe(undefined);
  });
});

describe("color module", () => {
  describe("upsert", () => {
    beforeEach(async () => {
      await prisma.color.deleteMany({});
    });

    it("should create a new color", async () => {
      const result = await caller.color.upsert([255, 0, 0]);
      expect(result).toHaveProperty("rgb", rgbTo16BitHex([255, 0, 0]));
    });

    it("should update an existing color", async () => {
      const input = [255, 0, 0];
      const result1 = await caller.color.upsert(input);
      const result2 = await caller.color.upsert(input);
      expect(result1).toHaveProperty("rgb", rgbTo16BitHex(input));
      expect(result2).toHaveProperty("rgb", rgbTo16BitHex(input));
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
