import { faker } from "@faker-js/faker";
import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { appRouter, type AppRouter } from "../src/root";
import { createContext } from "../src/trpc";

describe("@acme/api config", () => {
  const ctx = createContext();
  const caller = appRouter.createCaller(ctx);

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
