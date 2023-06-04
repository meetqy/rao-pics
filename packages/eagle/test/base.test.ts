import { describe, expect, test } from "vitest";

import { prisma, type Folder } from "@acme/db";

import { handleFolder } from "../folder";
import { transformImage } from "../image";
import imageMock from "./image.json";
import mock from "./metadata.json";

describe("@acme/eagle", async () => {
  await prisma.folder.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.color.deleteMany();
  await prisma.image.deleteMany();
  await prisma.library.deleteMany();

  const lib = await prisma.library.create({
    data: {
      name: "test",
      dir: "/test",
      type: "eagle",
    },
  });

  let folderRes: Folder[] = [];

  test("folder", async () => {
    await handleFolder(mock.folders, lib, (e) => console.log(e));

    folderRes = await prisma.folder.findMany();
    expect(folderRes).toHaveLength(5);
  });

  test("image", async () => {
    imageMock.folders = folderRes.map((e) => e.id);
    const res = await transformImage(imageMock, lib);
    expect(res).toHaveProperty("id");
  });
});
