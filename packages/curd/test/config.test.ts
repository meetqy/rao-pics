import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@acme/db";

import { Config } from "../src/config";

describe("Config", () => {
  beforeEach(async () => {
    // Clear the database before each test
    await prisma.config.deleteMany();
  });

  describe("get", () => {
    it("returns null if no config exists", async () => {
      const config = await Config.get();
      expect(config).toBeNull();
    });

    it("returns the config if it exists", async () => {
      const input = {
        assetsPort: faker.internet.port(),
        ip: faker.internet.ip(),
        webPort: faker.internet.port(),
      };
      await prisma.config.create({ data: { id: "config", ...input, lang: "zh-cn" } });

      const config = await Config.get();
      expect(config).toEqual(expect.objectContaining(input));
    });
  });

  describe("update", () => {
    it("creates a new config if none exists", async () => {
      const input = {
        assetsPort: faker.internet.port(),
        ip: faker.internet.ip(),
        webPort: faker.internet.port(),
      };
      await Config.update(input);

      const config = await prisma.config.findFirst();
      expect(config).toEqual(expect.objectContaining(input));
    });

    it("updates an existing config", async () => {
      const initialInput = {
        assetsPort: faker.internet.port(),
        ip: faker.internet.ip(),
        webPort: faker.internet.port(),
      };
      await prisma.config.create({ data: { id: "config", ...initialInput, lang: "zh-cn" } });

      const updatedInput = {
        assetsPort: faker.internet.port(),
        ip: faker.internet.ip(),
        webPort: faker.internet.port(),
      };
      await Config.update(updatedInput);

      const config = await prisma.config.findFirst();
      expect(config).toEqual(expect.objectContaining(updatedInput));
    });
  });
});
