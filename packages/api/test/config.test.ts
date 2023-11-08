import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

const defaultConfig = {
  name: "config",
  language: "zh-cn",
  color: "light",
  theme: "gallery",
  ip: null,
  serverPort: null,
  clientPort: null,
  pwdFolder: false,
  trash: false,
  startDiffLibrary: false,
  autoSync: false,
};

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

      const res = await caller.config.findUnique();

      expect(res).toEqual({
        ...defaultConfig,
        language: "zh-cn",
      });
    });

    it("should update the ip and serverPort field in the config table", async () => {
      await caller.config.upsert({
        ip: "0.0.0.0",
        serverPort: 8080,
      });

      const res = await caller.config.findUnique();

      expect(res).toEqual({
        ...defaultConfig,
        ip: "0.0.0.0",
        serverPort: 8080,
      });

      expect(
        await caller.config.upsert({
          serverPort: 8081,
        }),
      ).toEqual({
        ...defaultConfig,
        ip: "0.0.0.0",
        serverPort: 8081,
      });
    });

    it("should update the color and theme field in the config table", async () => {
      await caller.config.upsert({
        color: "senven",
      });

      const res = await caller.config.findUnique();

      expect(res).toEqual({
        ...defaultConfig,
        color: "senven",
      });
    });

    it("should update the theme field in the config table", async () => {
      await caller.config.upsert({
        theme: "dark",
      });

      const res = await caller.config.findUnique();

      expect(res).toEqual({
        ...defaultConfig,
        theme: "dark",
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

  describe("findUnique procedure", () => {
    it("should return the default config", async () => {
      await caller.config.upsert({
        language: "zh-cn",
        color: "light",
        theme: "gallery",
        pwdFolder: false,
        trash: false,
      });

      const res = await caller.config.findUnique();

      expect(res).toEqual(defaultConfig);
    });
  });
});
