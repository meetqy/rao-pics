import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, test } from "vitest";

import { appRouter, type AppRouter } from "../src/root";
import { createContext } from "../src/trpc";

describe("@acme/api config", () => {
  const ctx = createContext();
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["config"]["update"]>;
  const input: Input = {
    assetsPort: 9620,
    ip: "192.168.1.1",
    webPort: 9621,
  };

  test("update", async () => {
    expect(await caller.config.update(input)).toMatchObject({
      id: "config",
      ...input,
    });
  });

  test("get", async () => {
    expect(await caller.config.get()).toMatchObject({
      ...input,
      id: "config",
    });
  });
});
