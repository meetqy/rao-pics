import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "../src/root";
import { createContext } from "../src/trpc";

test("@acme/api library", async () => {
  const ctx = await createContext();
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["library"]["add"]>;
  const input: Input = {
    name: "test.library",
    dir: "/User/aaa/bb",
  };

  const result = await caller.library.add(input);

  expect(result).toMatchObject({ name: "test.library", dir: "/User/aaa/bb" });
});
