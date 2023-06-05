import { faker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";

import { prisma, type Folder } from "@acme/db";
import Mock from "@acme/mock";

import { handleFolder } from "../folder";
import { transformImage } from "../image";
import { SUPPORT_EXT } from "../types";

describe("@acme/eagle", async () => {
  await Mock.cleanDB();

  const lib = await prisma.library.create({
    data: Mock.library(),
  });

  let folderRes: Folder[] = [];

  test("Folder", async () => {
    const { folders, count } = Mock.eagle.folders();

    await handleFolder(folders, lib, (e) => console.log(e));

    folderRes = await prisma.folder.findMany({});
    expect(folderRes).toHaveLength(count);
  });

  test("Image support ext", async () => {
    const image = Mock.eagle.image({
      tags: Mock.eagle.tags(),
      folders: folderRes.map((e) => e.id),
      palettes: Mock.eagle.palettes(),
    });
    const random = faker.number.int({ min: 0, max: SUPPORT_EXT.length - 1 });
    image.ext = SUPPORT_EXT[random] || "jpg";

    const res = await transformImage(image, lib);
    expect(res).toHaveProperty("id");
  });

  test("Image not support ext", async () => {
    const image = Mock.eagle.image({
      tags: Mock.eagle.tags(),
      folders: folderRes.map((e) => e.id),
      palettes: Mock.eagle.palettes(),
    });

    image.ext = SUPPORT_EXT.includes(image.ext) ? "sqlite" : image.ext;

    const res = await transformImage(image, lib);
    expect(res).toBeNull();
  });
});
