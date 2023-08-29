import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("library module", () => {
  beforeEach(async () => {
    await prisma.library.deleteMany({});
  });

  describe("add procedure", () => {
    it("should create a new library when none exist", async () => {
      const input = "path/to/xxx.library";
      const result = await caller.library.add(input);

      expect(result).toMatchObject({
        path: input,
        type: "eagle",
      });

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(1);
      expect(libraries[0]).toMatchObject({
        path: input,
        type: "eagle",
      });
    });

    it("should throw an error when adding a library directory", async () => {
      const input = "path/to/library/";
      await caller.library.add(input).catch((err) =>
        expect(err).toMatchObject({
          message: "Cannot add a library directory.",
          code: "INTERNAL_SERVER_ERROR",
        }),
      );

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(0);
    });

    it("should throw an error when adding a second library", async () => {
      const input1 = "path/to/xxx.library";
      const input2 = "path/to/bbb.library";
      await caller.library.add(input1);

      caller.library.add(input2).catch((err) =>
        expect(err).toMatchObject({
          message: "Cannot add a library directory.",
          code: "INTERNAL_SERVER_ERROR",
        }),
      );

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(1);
      expect(libraries[0]).toMatchObject({
        path: input1,
        type: "eagle",
      });
    });

    it("should validate input using Zod schema", async () => {
      const input = 123;
      caller.library.add(input as never).catch((err) =>
        expect(err).toMatchObject({
          code: "BAD_REQUEST",
        }),
      );

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(0);
    });
  });
});
