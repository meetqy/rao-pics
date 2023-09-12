import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("config module", () => {
  beforeEach(async () => {
    await prisma.config.deleteMany();
  });

  afterAll(async () => {
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
        color: "light",
        theme: "tiga-basic",
        ip: null,
        staticServerPort: null,
        themeServerPort: null,
      });
    });

    it("should update the ip and staticServerPort field in the config table", async () => {
      await caller.config.upsert({
        ip: "0.0.0.0",
        staticServerPort: 8080,
      });

      const res = await caller.config.get();

      expect(res).toEqual({
        name: "config",
        language: "zh-cn",
        color: "light",
        theme: "tiga-basic",
        ip: "0.0.0.0",
        staticServerPort: 8080,
        themeServerPort: null,
      });

      expect(
        await caller.config.upsert({
          staticServerPort: 8081,
        }),
      ).toEqual({
        name: "config",
        language: "zh-cn",
        color: "light",
        theme: "tiga-basic",
        ip: "0.0.0.0",
        staticServerPort: 8081,
        themeServerPort: null,
      });
    });

    it("should update the color field in the config table", async () => {
      await caller.config.upsert({
        color: "senven",
      });

      const res = await caller.config.get();

      expect(res).toEqual({
        name: "config",
        language: "zh-cn",
        color: "senven",
        theme: "tiga-basic",
        ip: null,
        staticServerPort: null,
        themeServerPort: null,
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
        color: "light",
        theme: "dark",
        ip: null,
        staticServerPort: null,
        themeServerPort: null,
      });
    });

    it("language field throw errrr", () => {
      caller.config
        .upsert({
          language: "en-us1" as never,
        })
        .catch((e) => {
          expect(e).toHaveProperty("code", "BAD_REQUEST");
        });
    });
  });
});
