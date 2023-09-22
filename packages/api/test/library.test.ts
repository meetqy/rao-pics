import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("library module", () => {
  beforeEach(async () => {
    await caller.library.delete();
  });

  afterAll(async () => {
    await caller.library.delete();
  });

  describe("add procedure", () => {
    beforeEach(async () => {
      await caller.config.upsert({
        serverPort: 9100,
      });
    });

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

      await expect(caller.library.add(input)).rejects.toMatchObject({
        message: "Must be a '.library' directory.",
        code: "INTERNAL_SERVER_ERROR",
      });

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(0);
    });

    it("should throw an error when adding a second library", async () => {
      const input1 = "path/to/xxx.library";
      const input2 = "path/to/bbb.library";
      await caller.library.add(input1);

      await expect(caller.library.add(input2)).rejects.toMatchObject({
        message: "Cannot add more than one library.",
        code: "INTERNAL_SERVER_ERROR",
      });

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(1);
      expect(libraries[0]).toMatchObject({
        path: input1,
        type: "eagle",
      });
    });

    it("should validate input using Zod schema", async () => {
      const input = 123;

      await expect(caller.library.add(input as never)).rejects.toMatchObject({
        code: "BAD_REQUEST",
      });

      const libraries = await prisma.library.findMany({});
      expect(libraries).toHaveLength(0);
    });
  });

  describe("get procedure", () => {
    it("get library", async () => {
      const input = "path/to/xxx.library";
      await caller.library.add(input);

      const result = await caller.library.findUnique();

      expect(result).toMatchObject({
        path: input,
        type: "eagle",
      });
    });
  });

  describe("delete procedure", () => {
    it("should delete library", async () => {
      const input = "path/to/xxx.library";
      await caller.library.add(input);
      await caller.pending.upsert({
        path: "path/to/xxx.library",
        type: "create",
      });
      await caller.image.upsert({
        path: "path/to/xxx.jpg",
        name: "xxx",
        ext: "jpg",
        size: 123,
        width: 123,
        height: 123,
        mtime: new Date(),
      });
      await caller.folder.upsert({
        name: "xxx",
        id: "xxx",
      });

      await caller.library.delete();

      expect(await prisma.image.findMany()).toHaveLength(0);
      expect(await prisma.folder.findMany()).toHaveLength(0);
      expect(await caller.library.findUnique()).toBeNull();
      expect(await caller.pending.get()).toHaveLength(0);
    });
  });
});
