import { beforeEach, describe, expect, it } from "vitest";
import { s } from "vitest/dist/types-63abf2e0";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("folder module", () => {
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
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

      const dbItem = await caller.folder.get({
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

      const dbItem = await caller.folder.get({ id: input.id });

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
});
