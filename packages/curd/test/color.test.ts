import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { type z } from "zod";

import { type Constant } from "@acme/constant";
import { prisma, type Image, type Library } from "@acme/db";

import curd, { type ZodInput } from "..";
import { Color } from "../src/color";

interface LocalTestContext {
  lib: Library;
  imageMock: z.infer<typeof ZodInput.image.create>;
  image: Image;
}

describe("@acme/curd Color", () => {
  beforeEach<LocalTestContext>(async (ctx) => {
    await curd.util.dbClean();
    const lib = await curd.library.create({
      type: "eagle",
      name: faker.system.fileName(),
      dir: faker.system.filePath(),
    });

    ctx.lib = lib;

    ctx.imageMock = {
      libraryId: lib.id,
      path: faker.system.filePath(),
      thumbnailPath: faker.system.filePath(),
      name: faker.system.fileName(),
      size: faker.number.int({ max: 9999999 }),
      createTime: faker.date.past(),
      lastTime: faker.date.past(),
      ext: faker.string.fromCharacters(["jpg", "png", "gif", "webp"]) as Constant["ext"],
      width: faker.number.int({ max: 9999999 }),
      height: faker.number.int({ max: 9999999 }),
    };

    ctx.image = await curd.image.create(ctx.imageMock);
  });

  describe("create", () => {
    it<LocalTestContext>("should create a new color", async ({ image }) => {
      const color = await Color.upsert({
        imageId: image.id,
        color: "#FF0000",
      });

      expect(color.rgb).toEqual(16711700);
    });

    it<LocalTestContext>("should throw an error if the color is invalid", async ({ image }) => {
      await expect(
        Color.upsert({
          imageId: image.id,
          color: "#FF000",
        }),
      ).rejects.toThrow();
    });
  });

  describe("get", () => {
    it<LocalTestContext>("should return the colors of an image", async ({ imageMock }) => {
      imageMock.colors = ["#ff0000", "#ffffff", "#000000"];
      const image = await curd.image.create(imageMock);

      const colors = await Color.get({
        imageId: image.id,
      });

      expect(colors).toHaveLength(3);

      expect(colors[0]?.rgb).toEqual(16711700);
      expect(colors[1]?.rgb).toEqual(16777300);
      expect(colors[2]?.rgb).toEqual(0);
    });

    it("should return an empty array if the image does not exist", async () => {
      const colors = await Color.get({
        imageId: 999,
      });

      expect(colors).toEqual([]);
    });
  });

  describe("clear", () => {
    it<LocalTestContext>("should delete colors without images", async ({ image }) => {
      await prisma.color.create({
        data: {
          rgb: 1232131,
        },
      });

      await Color.upsert({
        imageId: image.id,
        color: "#ff0000",
      });

      await Color.clear();

      const colors = await prisma.color.findMany();

      expect(colors).toHaveLength(1);
      expect(colors[0]?.rgb).toEqual(16711700);
    });
  });
});
