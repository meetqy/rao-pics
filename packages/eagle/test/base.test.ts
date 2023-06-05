import { describe, expect, test } from "vitest";

import { prisma, type Folder } from "@acme/db";
import Mock from "@acme/mock";

import { handleFolder } from "../folder";
import { transformImage } from "../image";
import imageMock from "./image.json";

describe("@acme/eagle", async () => {
  await Mock.cleanDB();

  const lib = await prisma.library.create({
    data: Mock.library(),
  });

  let folderRes: Folder[] = [];

  test("folder", async () => {
    const { folders, count } = Mock.eagle.folders();

    await handleFolder(folders, lib, (e) => console.log(e));

    folderRes = await prisma.folder.findMany({});
    expect(folderRes).toHaveLength(count);
  });

  test("image", async () => {
    imageMock.folders = folderRes.map((e) => e.id);
    const res = await transformImage(imageMock, lib);
    expect(res).toHaveProperty("id");
  });
});
