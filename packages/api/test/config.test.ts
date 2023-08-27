import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("config module", () => {
  beforeEach(async () => {
    await prisma.config.deleteMany();
  });

  describe("upsert procedure", () => {
    it("should update the language field in the config table", async () => {
      await caller.config.upsert({
        language: "zh-cn",
      });

      const res = await caller.config.get();

      expect(res).toEqual({
        name: "config",
        language: "zh-cn",
        skin: "tiga",
        theme: "light",
      });
    });

    it("should update the skin field in the config table", async () => {
      await caller.config.upsert({
        skin: "senven",
      });

      const res = await caller.config.get();

      expect(res).toEqual({
        name: "config",
        language: "zh-cn",
        skin: "senven",
        theme: "light",
      });
    });

    it("should update the theme field in the config table", async () => {
      await caller.config.upsert({
        theme: "dark",
      });

      const res = await caller.config.get();

      expect(res).toEqual({
        name: "config",
        language: "zh-cn",
        skin: "tiga",
        theme: "dark",
      });
    });
  });
});
