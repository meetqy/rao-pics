import { faker } from "@faker-js/faker";
import { beforeAll, describe, expect, it } from "vitest";

import {
  AppDataSource,
  Config as ConfigEntity,
  initAppDataSource,
} from "@rao-pics/database";

import { Config } from "../src/config";

describe("Config", () => {
  beforeAll(async () => {
    await initAppDataSource();
  });

  it("no record in config, throw error", async () => {
    await AppDataSource.getRepository(ConfigEntity).delete({ id: "config" });
    await expect(() => Config.get()).rejects.toThrowError();
  });

  it("should update the config entity with the given input", async () => {
    const input = {
      assetsPort: faker.internet.port(),
      ip: faker.internet.ip(),
      webPort: faker.internet.port(),
    };
    const result = await Config.update(input);
    expect(result.assetsPort).toBe(input.assetsPort);
    expect(result.ip).toBe(input.ip);
    expect(result.webPort).toBe(input.webPort);
  });

  it('only one record in config, id is "config"', async () => {
    const input = {
      assetsPort: faker.internet.port(),
      ip: faker.internet.ip(),
      webPort: faker.internet.port(),
    };

    const result = await Config.update(input);
    expect(result.id).toBe("config");
  });

  it("should get the config entity with id 'config'", async () => {
    const config = new ConfigEntity();
    config.id = "config";
    config.assetsPort = 3000;
    config.ip = "127.0.0.1";
    config.webPort = 8080;
    await AppDataSource.getRepository(ConfigEntity).save(config);
    const result = await Config.get();
    expect(result.assetsPort).toBe(config.assetsPort);
    expect(result.ip).toBe(config.ip);
    expect(result.webPort).toBe(config.webPort);
  });
});
