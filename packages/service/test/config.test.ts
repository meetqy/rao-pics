import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { initAppDataSource } from "@rao-pics/database";

import { Config } from "../src/config";

describe("@rao-pics/service Config", () => {
  beforeEach(async () => {
    await initAppDataSource();
  });

  describe("update", () => {
    it("should update the config with valid input", async () => {
      const input = {
        assetsPort: faker.internet.port(),
        ip: faker.internet.ip(),
        webPort: faker.internet.port(),
      };

      const result = await Config.update(input);

      expect(result.assetsPort).toEqual(input.assetsPort);
      expect(result.ip).toEqual(input.ip);
      expect(result.webPort).toEqual(input.webPort);
    });

    // it("should throw an error with invalid input", async () => {
    //   const input = {
    //     assetsPort: "not a number",
    //     ip: "127.0.0.1",
    //     webPort: 8080,
    //   };

    //   await expect(Config.update(input)).rejects.toThrowError(
    //     ConfigSchema.update._error("Invalid input"),
    //   );
    // });
  });
});
