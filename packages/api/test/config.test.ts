import { afterAll, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("config module", () => {
  afterAll(async () => {
    await prisma.config.deleteMany();
  });

  describe("upsert procedure", () => {
    it("should update the language field in the config table", async () => {
      const res = await caller.config.upsert({
        language: "zh-cn",
      });

      expect(res).toEqual({ name: "config", language: "zh-cn" });
    });
  });

  describe("get procedure", () => {
    it("should return the config row", async () => {
      const res = await caller.config.get();

      expect(res).toEqual({ name: "config", language: "zh-cn" });
    });
  });
});
