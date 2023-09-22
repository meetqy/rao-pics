import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("folder module", () => {
  beforeEach(async () => {
    await prisma.folder.deleteMany();
  });

  afterAll(async () => {
    await prisma.folder.deleteMany();
  });

  describe("upsert", () => {
    it("creates a new folder if it doesn't exist", async () => {
      const input = {
        id: "folder-1",
        name: "Folder 1",
        description: "This is folder 1",
      };

      const result = await caller.folder.upsert(input);

      expect(result).toMatchObject(input);

      const dbItem = await caller.folder.find({
        id: input.id,
      });

      expect(dbItem).toMatchObject(input);
    });

    it("updates an existing folder if it exists", async () => {
      await caller.folder.upsert({
        id: "folder-1",
        name: "Folder 1",
        description: "This is folder 1",
      });

      const input = {
        id: "folder-1",
        name: "Updated Folder 1",
        description: "This is the updated folder 1",
      };

      const result = await caller.folder.upsert(input);

      expect(result).toMatchObject(input);

      const dbItem = await caller.folder.find({ id: input.id });

      expect(dbItem).toMatchObject(input);
    });

    it("throws an error if input is invalid", async () => {
      const input = {
        id: "folder-1",
        name: "Folder 1",
        description: 123,
      };

      await expect(caller.folder.upsert(input as never)).rejects.toMatchObject({
        code: "BAD_REQUEST",
      });
    });
  });

  describe("get", () => {
    it("returns all folders if no input is provided", async () => {
      const input = {
        id: "folder-1",
        name: "Folder 1",
        description: "This is folder 1",
      };

      await caller.folder.upsert(input);

      const result = await caller.folder.find();

      expect(result).toMatchObject([input]);
    });

    it("returns a folder by id if id is provided", async () => {
      const input = {
        id: "folder-1",
        name: "Folder 1",
        description: "This is folder 1",
      };

      await caller.folder.upsert(input);

      const result = await caller.folder.find({ id: input.id });

      expect(result).toMatchObject(input);
    });

    it("returns all folders by pid if pid is provided", async () => {
      const input = {
        id: "folder-1",
        name: "Folder 1",
        description: "This is folder 1",
      };

      const input1 = {
        id: "folder-1-1",
        pid: "folder-1",
        name: "Folder 11",
        description: "This is folder 1",
      };

      const input2 = {
        id: "folder-1-2",
        pid: "folder-1",
        name: "Folder 111",
        description: "This is folder 1",
      };

      await caller.folder.upsert(input);
      await caller.folder.upsert(input1);
      await caller.folder.upsert(input2);

      const result = await caller.folder.find({ pid: input.id });

      expect(result).toHaveLength(2);
      expect(result).toMatchObject([input1, input2]);
    });
  });
});
