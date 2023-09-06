import { writeFileSync } from "fs";
import { join } from "path";
import { removeSync, writeJSONSync } from "fs-extra";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import mockData from "../mocks/metadata.json";
import { checkedImage, upsertImage } from "../src/sync/image";

const mockjson = join(__dirname, "../mocks/metadata1.json");

describe("sync.image", () => {
  afterAll(async () => {
    await prisma.image.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.folder.deleteMany();
    await prisma.color.deleteMany();
    removeSync(mockjson);
  });

  beforeEach(async () => {
    await prisma.image.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.folder.deleteMany();
    await prisma.color.deleteMany();
  });

  describe("checkedImage", () => {
    it("mtime < 3000", async () => {
      writeJSONSync(mockjson, mockData);
      await upsertImage({ path: mockjson, type: "create" });

      writeJSONSync(mockjson, mockData);
      const data = await checkedImage(mockjson);
      expect(data).toBeUndefined();
    });

    it("json error", async () => {
      writeFileSync(mockjson, "{as222:xx22,1,2,2,}");

      await expect(checkedImage(mockjson, 0)).rejects.toThrowError(
        "[json-error] read json error",
      );
    });

    it("not support file type", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        ext: "xxx",
      });

      await expect(checkedImage(mockjson, 0)).rejects.toThrowError(
        "[unsupported-ext] not support file type",
      );
    });
  });

  describe("upsertImage tags", () => {
    it("should return image if new tag", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        tags: ["tag1"],
      });

      const image = await upsertImage({
        path: mockjson,
        type: "create",
      });

      const tag = await prisma.tag.findUnique({
        where: { name: "tag1" },
        include: { images: true },
      });

      expect(tag?.name).toEqual("tag1");
      expect(tag?.images).toHaveLength(1);
      expect(tag?.images).toContainEqual(image);
    });

    it("should return image if remove old tag and add new tag", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        tags: ["tag1"],
      });

      await upsertImage({
        path: mockjson,
        type: "create",
      });

      writeJSONSync(mockjson, {
        ...mockData,
        tags: ["tag2"],
      });

      const image = await upsertImage(
        {
          path: mockjson,
          type: "update",
        },
        0,
      );

      const tag1 = await prisma.tag.findUnique({
        where: { name: "tag1" },
        include: { images: true },
      });

      const tag2 = await prisma.tag.findUnique({
        where: { name: "tag2" },
        include: { images: true },
      });

      const tags = await prisma.tag.findMany({});
      expect(tags).toHaveLength(1);

      expect(tag1).toBeNull();

      expect(tag2?.name).toEqual("tag2");
      expect(tag2?.images).toHaveLength(1);
      expect(tag2?.images).toContainEqual(image);
    });
  });
});
