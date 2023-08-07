import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import { type z } from "zod";

import { type Constant } from "@acme/constant";
import { type Library } from "@acme/db";

import curd, { type ZodInput } from "..";

interface LocalTestContext {
  lib: Library;
  imageMock: z.infer<typeof ZodInput.image.create>;
}

describe("@acme/curd image", async () => {
  await curd.util.dbClean();

  beforeEach<LocalTestContext>(async (ctx) => {
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
  });

  test<LocalTestContext>(`Create image, Do't folder,tag,color.`, async ({ imageMock }) => {
    const img = await curd.image.create(imageMock);
    expect(img).toMatchObject(imageMock);
    expect(img).toHaveProperty("id");
  });

  test<LocalTestContext>(`Create image, Has folder and create folder`, async ({ imageMock, lib }) => {
    const folders = [{ id: "abc" }, { id: faker.system.fileName() }];
    const img = await curd.image.create({
      ...imageMock,
      folders,
    });

    expect(img).toMatchObject(imageMock);
    const f = await curd.folder.get({ library: lib.id });
    expect(f).toHaveLength(folders.length);

    const nfIds = f.map((f) => f.id);
    expect(nfIds).toContain("abc");
    expect(nfIds).toContain(folders[1]?.id);
  });

  test<LocalTestContext>(`Create image, Has folder filed and connect folder`, async ({ imageMock }) => {
    const folders = [{ name: faker.system.fileName(), id: "abc" }, { id: faker.system.fileName() }];
    const img = await curd.image.create({
      ...imageMock,
      folders,
    });

    expect(img).toMatchObject(imageMock);
    const nf = await curd.folder.get({});
    expect(nf).toHaveLength(3);

    const nfIds = nf.map((f) => f.id);
    expect(nfIds).toContain("abc");
    expect(nfIds).toContain(folders[1]?.id);
  });

  test<LocalTestContext>(`Create image, Has tag filed and create tag`, async ({ imageMock, lib }) => {
    const tags = ["abc", faker.animal.bird()];
    const img = await curd.image.create({
      ...imageMock,
      tags,
    });

    expect(img).toMatchObject(imageMock);
    const t = await curd.tag.get({ library: lib.id });
    expect(t).toHaveLength(tags.length);

    const tNames = t.map((t) => t.name);
    expect(tNames).toContain(tags[0]);
    expect(tNames).toContain(tags[1]);
  });

  test<LocalTestContext>(`Create image, Has colors filed`, async ({ imageMock }) => {
    const img = await curd.image.create({
      ...imageMock,
      colors: ["#ffffff", "#000000", "#ff0000", "#dd0000"],
    });

    expect(img).toMatchObject(imageMock);
    const colors = await curd.color.get({ imageId: img.id });
    expect(colors).toHaveLength(4);
  });

  test<LocalTestContext>(`Create image, Has colors filed and colors similar`, async ({ imageMock }) => {
    const img = await curd.image.create({
      ...imageMock,
      colors: ["#f5f5f1", "#f5f5f2", "#f5f5f3", "#f5f5f4", "#f5f5f5", "#f5f5f6", "#f5f5f7", "#f5f5f8", "#f5f5f9"],
    });

    expect(img).toMatchObject(imageMock);
    const colors = await curd.color.get({ imageId: img.id });
    expect(colors).toHaveLength(1);
  });

  let xyzLibraryId: number;
  test<LocalTestContext>(`Update image and folders filed: {id: string}[]`, async ({ imageMock }) => {
    xyzLibraryId = imageMock.libraryId;

    // create two folder and one image.
    await Promise.all([
      curd.folder.upsert({
        id: "xyz",
        name: faker.system.fileName(),
        libraryId: imageMock.libraryId,
      }),
      curd.folder.upsert({
        id: "uvw",
        name: faker.system.fileName(),
        libraryId: imageMock.libraryId,
      }),
      curd.image.create({
        ...imageMock,
        path: "xyz",
      }),
    ]);

    const img = await curd.image.get({ path: "xyz", libraryId: imageMock.libraryId });
    expect(img).toHaveLength(1);

    const item = img[0];

    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        folders: [{ id: "xyz" }, { id: "uvw" }],
      });

      const img2 = await curd.image.get({ id: item.id });
      expect(img2).toHaveLength(1);
      expect(img2[0]?.folders).toHaveLength(2);
    }
  });

  test<LocalTestContext>(`Update image and folders filed: undefined`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        folders: undefined,
      });

      const img2 = await curd.image.get({ id: item.id });
      expect(img2).toHaveLength(1);
      expect(img2[0]?.folders).toHaveLength(2);
    }
  });

  test<LocalTestContext>(`Update image and folders filed: []`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];

    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        folders: [],
      });

      const img2 = await curd.image.get({ id: item.id });
      expect(img2).toHaveLength(1);
      expect(img2[0]?.folders).toHaveLength(0);
    }
  });

  test<LocalTestContext>(`Update image and tags filed: string[]`, async ({ imageMock }) => {
    await Promise.all([curd.tag.upsert({ name: "abc", libraryId: imageMock.libraryId }), curd.tag.upsert({ name: "xyz", libraryId: imageMock.libraryId })]);

    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        tags: ["abc", "xyz"],
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.tags).toHaveLength(2);
    }
  });

  test<LocalTestContext>(`Update image and tags filed: undefined`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        tags: undefined,
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.tags).toHaveLength(2);
    }
  });

  test<LocalTestContext>(`Update image and tags flied: []`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        tags: [],
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.tags).toHaveLength(0);
    }
  });

  test<LocalTestContext>(`Update image and colors filed: string[]`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        colors: ["#ffffff", "#000000", "#ff0000", "#dd0000"],
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.colors).toHaveLength(4);
    }
  });

  test<LocalTestContext>(`Update image and colors filed: string[]`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        colors: undefined,
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.colors).toHaveLength(4);
    }
  });

  test<LocalTestContext>(`Update image and colors filed: []`, async () => {
    const img = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });
    expect(img).toHaveLength(1);

    const item = img[0];
    if (item) {
      await curd.image.update({
        id: item.id,
        libraryId: item.libraryId,
        colors: [],
      });

      const img1 = await curd.image.get({ path: "xyz", libraryId: xyzLibraryId });

      expect(img1[0]?.colors).toHaveLength(0);
    }
  });
});
