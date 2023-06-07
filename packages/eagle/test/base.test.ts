import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import { prisma, type Color, type Image, type Tag } from "@acme/db";
import Mock, { type MockType } from "@acme/mock";

import { handleFolder } from "../folder";
import { transformImage } from "../image";
import { SUPPORT_EXT } from "../types";

type LocalTestContext = MockType["Eagle"]["LocalTestContext"];

describe("@acme/eagle", async () => {
  await Mock.cleanDB();

  Mock.eagle.vitestBeforeEach(async (ctx) => {
    ctx.lib = await prisma.library.create({
      data: Mock.library(),
    });
  });

  let imageRes:
    | (Image & {
        colors: Color[];
        tags: Tag[];
      })
    | null = null;

  test<LocalTestContext>("Folder", async ({ folders, lib }) => {
    const { folders: f, count } = folders;
    await handleFolder(f, lib, (e) => console.log(e));

    const res = await prisma.folder.findMany({});
    expect(res).toHaveLength(count);
  });

  test<LocalTestContext>("Image ext is supported", async (ctx) => {
    const { image, lib } = ctx;
    const random = faker.number.int({ min: 0, max: SUPPORT_EXT.length - 1 });
    image.ext = SUPPORT_EXT[random] || "jpg";
    image.isDeleted = false;

    await transformImage(image, lib);
    const res = await prisma.image.findFirst({
      where: { id: image.id },
      include: { colors: true, tags: true },
    });
    imageRes = res;
    expect(res).toHaveProperty("id");
  });

  test<LocalTestContext>("Image colors", ({ image }) => {
    expect(imageRes).toHaveProperty("colors");
    expect(imageRes?.colors).toHaveLength(image.palettes.length);
  });

  test<LocalTestContext>("Image tags", ({ image }) => {
    expect(imageRes).toHaveProperty("tags");
    expect(imageRes?.tags).toHaveLength(image.tags.length);
  });

  test<LocalTestContext>("Image 'isDeleted' is true", async ({ image, lib }) => {
    image.isDeleted = true;

    const res = await transformImage(image, lib);
    expect(res).toBeNull();
  });

  test<LocalTestContext>("Image ext is not supported", async ({ image, lib }) => {
    image.ext = SUPPORT_EXT.includes(image.ext) ? "sqlite" : image.ext;
    image.isDeleted = false;

    const res = await transformImage(image, lib);
    expect(res).toBeNull();
  });
});
