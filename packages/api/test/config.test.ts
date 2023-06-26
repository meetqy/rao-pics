import { faker } from "@faker-js/faker";
import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import Mock from "@acme/mock";

import { appRouter, type AppRouter } from "../index";

describe("@acme/api config", async () => {
  await Mock.dbClean();
  const caller = appRouter.createCaller({});

  type Input = inferProcedureInput<AppRouter["config"]["update"]>;
  const input: Input = {
    assetsPort: faker.internet.port(),
    ip: faker.internet.ip(),
    webPort: faker.internet.port(),
  };

  test("Update", async () => {
    expect(await caller.config.update(input)).toMatchObject({
      id: "config",
      ...input,
    });
  });

  test("Get", async () => {
    expect(await caller.config.get()).toMatchObject({
      ...input,
      id: "config",
    });
  });
});
