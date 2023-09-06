import { writeFileSync } from "fs";
import { join } from "path";
import { removeSync, writeJSONSync } from "fs-extra";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import mockData from "../mocks/metadata.json";
import { rgbToNumberMutilple100 } from "../src/color";
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

    it("should return image if remove old tag", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        tags: ["tag1", "tag2"],
      });

      await upsertImage({
        path: mockjson,
        type: "create",
      });

      writeJSONSync(mockjson, {
        ...mockData,
        tags: [],
      });

      await upsertImage(
        {
          path: mockjson,
          type: "update",
        },
        0,
      );

      const tags = await prisma.tag.findMany({ include: { images: true } });
      expect(tags).toHaveLength(0);

      expect(
        await prisma.image.findUnique({
          where: { path: mockjson },
          include: { tags: true },
        }),
      ).toHaveProperty("tags", []);
    });
  });

  describe("upsertImage colors", () => {
    it("should return image if new color", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        palettes: [{ color: [255, 255, 255], ratio: 0.1 }],
      });

      const image = await upsertImage({
        path: mockjson,
        type: "create",
      });

      const color = await prisma.color.findUnique({
        where: { rgb: rgbToNumberMutilple100([255, 255, 255]) },
        include: { images: true },
      });

      expect(color).toHaveProperty(
        "rgb",
        rgbToNumberMutilple100([255, 255, 255]),
      );
      expect(color?.images).toHaveLength(1);
      expect(color?.images).toContainEqual(image);
    });

    it("should return image if remove old color and add new color", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        palettes: [{ color: [255, 255, 255], ratio: 0.1 }],
      });

      await upsertImage({
        path: mockjson,
        type: "create",
      });

      writeJSONSync(mockjson, {
        ...mockData,
        palettes: [
          { color: [255, 255, 0], ratio: 0.1 },
          { color: [255, 0, 0], ratio: 0.1 },
        ],
      });

      const image = await upsertImage(
        {
          path: mockjson,
          type: "update",
        },
        0,
      );

      const color = await prisma.color.findUnique({
        where: { rgb: rgbToNumberMutilple100([255, 255, 255]) },
        include: { images: true },
      });

      expect(color).toBeNull();

      const color1 = await prisma.color.findUnique({
        where: { rgb: rgbToNumberMutilple100([255, 255, 0]) },
        include: { images: true },
      });

      const color2 = await prisma.color.findUnique({
        where: { rgb: rgbToNumberMutilple100([255, 0, 0]) },
        include: { images: true },
      });

      expect(color1?.rgb).toEqual(rgbToNumberMutilple100([255, 255, 0]));
      expect(color1?.images).toHaveLength(1);
      expect(color1?.images).toContainEqual(image);
      expect(color2?.rgb).toEqual(rgbToNumberMutilple100([255, 0, 0]));
      expect(color2?.images).toHaveLength(1);
      expect(color2?.images).toContainEqual(image);

      const images = await prisma.image.findUnique({
        where: { path: mockjson },
        include: { colors: true },
      });

      expect(images?.colors).toHaveLength(2);
      expect(images?.colors).toEqual([
        { rgb: color1?.rgb },
        { rgb: color2?.rgb },
      ]);
    });

    it("should return image if remove old color", async () => {
      writeJSONSync(mockjson, {
        ...mockData,
        palettes: [
          { color: [255, 255, 255], ratio: 0.1 },
          { color: [255, 255, 0], ratio: 0.1 },
        ],
      });

      await upsertImage({
        path: mockjson,
        type: "create",
      });

      writeJSONSync(mockjson, {
        ...mockData,
        palettes: [],
      });

      await upsertImage(
        {
          path: mockjson,
          type: "update",
        },
        0,
      );

      const images = await prisma.image.findUnique({
        where: { path: mockjson },
        include: { colors: true },
      });

      expect(images?.colors).toHaveLength(0);
      expect(await prisma.color.findMany({})).toHaveLength(0);
    });
  });
});
