import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";
import { rgbToNumberMutilple100 } from "../src/color";

const caller = router.createCaller({});

describe("image module", () => {
  afterAll(async () => {
    await prisma.image.deleteMany();
    await prisma.folder.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.config.deleteMany();
  });

  describe("findUnique", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
    });

    it("should find an image by id", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      const result = await caller.image.findUnique({ id: testImage.id });

      expect(result).toEqual(testImage);
    });

    it("should find an image by id", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      const result = await caller.image.findUnique({ id: testImage.id });

      expect(result).toEqual(testImage);
    });

    it("should find an image by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/1image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      const result = await caller.image.findUnique({ path: testImage.path });

      expect(result).toEqual(testImage);
    });

    it("should return null if no image is found", async () => {
      const result = await caller.image.findUnique({ id: 1234 });

      expect(result).toBeNull();
    });
  });

  // findUnique
  // 不返回 回收站/加密文件夹/folder.show=false 的素材
  describe("findUnique, config.trash", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
      await prisma.config.deleteMany();
    });

    it("config.trash = true, isDeleted = true should find an image by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        isDeleted: true,
        mtime: new Date(),
      });
      await caller.config.upsert({ trash: true });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toBeNull();
    });

    it("config.trash = true, isDeleted = false should find an image by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        isDeleted: false,
        mtime: new Date(),
      });
      await caller.config.upsert({ trash: true });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toEqual(testImage);
    });

    it("config.trash = false, isDeleted = true should find an image by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        isDeleted: true,
        mtime: new Date(),
      });
      await caller.config.upsert({ trash: false });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toBeNull();
    });

    it("config.trash = false, isDeleted = false should find an image by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        isDeleted: false,
        mtime: new Date(),
      });
      await caller.config.upsert({ trash: false });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toEqual(testImage);
    });
  });

  describe("findUnique, config.pwdFolder", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
      await prisma.config.deleteMany();
      await prisma.folder.deleteMany();
    });

    it("config.pwdFolder = true, folder.show = true should find an image by path", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1", show: true });

      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1"],
        },
      });
      await caller.config.upsert({ pwdFolder: true });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toEqual(testImage);
    });

    it("config.pwdFolder = true, folder.show = false should find an image by path", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1", show: false });

      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1"],
        },
      });
      await caller.config.upsert({ pwdFolder: true });

      const result = await caller.image.findUnique({ path: testImage.path });
      expect(result).toBeNull();
    });

    it("config.pwdFolder = false, folder.show = false should find an image by path", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1", show: false });

      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1"],
        },
      });
      await caller.config.upsert({ pwdFolder: false });

      const result = await caller.image.findUnique({
        path: testImage.path,
        includes: ["folders"],
      });
      expect(result).toBeNull();
    });

    it("config.pwdFolder = false, folder.show = true should find an image by path", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1", show: true });

      const testImage = await caller.image.upsert({
        path: "/path/to/metadata.json",
        name: "image",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1"],
        },
      });
      await caller.config.upsert({ pwdFolder: false });

      const result = await caller.image.findUnique({
        path: testImage.path,
      });

      expect(result).toEqual(testImage);
    });
  });

  describe("upsert", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
    });

    it("should create a new image", async () => {
      const input = {
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      };
      const result = await caller.image.upsert(input);
      expect(result).toMatchObject(input);
      expect(result.id).toBeDefined();
    });

    it("should update an existing image", async () => {
      const input = {
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      };

      const testImage = await caller.image.upsert(input);

      const input2 = {
        id: testImage.id,
        ...input,
        path: "/path/to/image1.jpg",
      };

      const result = await caller.image.upsert(input2);
      expect(result).toMatchObject(input2);
      expect(await prisma.image.findMany({})).toHaveLength(1);
    });

    //     it("should connect and disconnect colors", async () => {
    //       const testImage = await prisma.image.create({
    //         data: {
    //           path: "/path/to/image.jpg",
    //           name: "image.jpg",
    //           size: 1024,
    //           ext: "jpg",
    //           width: 800,
    //           height: 600,
    //           colors: {
    //             create: [{ rgb: 0xff0000 }, { rgb: 0x00ff00 }],
    //           },
    //         },
    //         include: { colors: true },
    //       });
    //       const input = {
    //         id: testImage.id,
    //         colors: {
    //           connect: [0xff0000],
    //           disconnect: [0x00ff00],
    //         },
    //       };
    //       const result = await image.upsert.mutation({ input });
    //       expect(result.colors).toHaveLength(1);
    //       expect(result.colors[0].rgb).toEqual(0xff0000);
    //     });
    //     it("should connect and disconnect folders", async () => {
    //       const testImage = await prisma.image.create({
    //         data: {
    //           path: "/path/to/image.jpg",
    //           name: "image.jpg",
    //           size: 1024,
    //           ext: "jpg",
    //           width: 800,
    //           height: 600,
    //           folders: {
    //             create: [{ id: "folder1" }, { id: "folder2" }],
    //           },
    //         },
    //         include: { folders: true },
    //       });
    //       const input = {
    //         id: testImage.id,
    //         folders: {
    //           connect: ["folder1"],
    //           disconnect: ["folder2"],
    //         },
    //       };
    //       const result = await image.upsert.mutation({ input });
    //       expect(result.folders).toHaveLength(1);
    //       expect(result.folders[0].id).toEqual("folder1");
    //     });
  });

  describe("upsert tags", () => {
    beforeEach(async () => {
      await prisma.tag.deleteMany();
      await prisma.image.deleteMany();
    });

    it("should connect tags", async () => {
      await caller.tag.upsert("tag1");
      await caller.tag.upsert("tag2");

      await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        mtime: new Date(),
        ext: "jpg",
        width: 800,
        height: 600,
        tags: {
          connect: ["tag1", "tag2"],
          disconnect: [],
        },
      });

      const res = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: {
          tags: true,
        },
      });

      expect(res?.tags).toHaveLength(2);
      expect(res?.tags).toMatchObject([{ name: "tag1" }, { name: "tag2" }]);
    });

    it("should connect and disconnect tags", async () => {
      await caller.tag.upsert("tag1");
      await caller.tag.upsert("tag2");
      await caller.tag.upsert("tag3");

      const input = {
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      };

      const res = await caller.image.upsert({
        ...input,
        tags: {
          connect: ["tag1", "tag2", "tag3"],
        },
      });

      await caller.tag.upsert("tag4");

      await caller.image.upsert({
        id: res.id,
        ...input,
        tags: {
          disconnect: ["tag2", "tag3"],
          connect: ["tag4"],
        },
      });

      const result = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: {
          tags: true,
        },
      });

      expect(result?.tags).toHaveLength(2);
      expect(result?.tags).toMatchObject([{ name: "tag1" }, { name: "tag4" }]);
    });
  });

  describe("upsert folder", () => {
    beforeEach(async () => {
      await prisma.folder.deleteMany();
      await prisma.image.deleteMany();
    });

    it("should connect folders", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1" });
      await caller.folder.upsert({ name: "folder2", id: "2" });
      await caller.folder.upsert({ name: "folder3", id: "3" });

      await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1", "2", "3"],
        },
      });

      const res = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: { folders: true },
      });

      expect(res?.folders).toHaveLength(3);
      expect(res?.folders).toMatchObject([
        { name: "folder1" },
        { name: "folder2" },
        { name: "folder3" },
      ]);
    });

    it("should connect and disconnect folders", async () => {
      await caller.folder.upsert({ name: "folder1", id: "1" });
      await caller.folder.upsert({ name: "folder2", id: "2" });
      await caller.folder.upsert({ name: "folder3", id: "3" });

      const res = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1", "2", "3"],
        },
      });

      await caller.folder.upsert({ name: "folder4", id: "4" });

      await caller.image.upsert({
        id: res.id,
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        folders: {
          connect: ["1", "4"],
          disconnect: ["2", "3"],
        },
      });

      const result = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: { folders: true },
      });

      expect(result?.folders).toHaveLength(2);
      expect(result?.folders).toMatchObject([
        { name: "folder1" },
        { name: "folder4" },
      ]);
    });
  });

  describe("upsert colors", () => {
    beforeEach(async () => {
      await prisma.color.deleteMany();
      await prisma.image.deleteMany();
    });

    it("should connect colors", async () => {
      const color1 = [255, 0, 0];
      const color2 = [255, 201, 100];
      const color3 = [20, 201, 12];

      await caller.color.upsert(color1);
      await caller.color.upsert(color2);
      await caller.color.upsert(color3);

      await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
        colors: {
          connect: [color1, color2, color3].map((item) =>
            rgbToNumberMutilple100(item),
          ),
        },
      });

      const result = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: { colors: true },
      });

      expect(result?.colors).toHaveLength(3);
    });

    it("should connect and disconnect colors", async () => {
      const color1 = [255, 0, 0];
      const color2 = [255, 201, 100];
      const color3 = [20, 201, 12];

      await caller.color.upsert(color1);
      await caller.color.upsert(color2);
      await caller.color.upsert(color3);

      const res = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        mtime: new Date(),
        ext: "jpg",
        width: 800,
        height: 600,
        colors: {
          connect: [color1, color2, color3].map((item) =>
            rgbToNumberMutilple100(item),
          ),
        },
      });

      const color4 = [33, 22, 11];

      await caller.image.upsert({
        id: res.id,
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        mtime: new Date(),
        height: 600,
        colors: {
          connect: [color2, color3].map((item) => rgbToNumberMutilple100(item)),
          disconnect: [color1, color4].map((item) =>
            rgbToNumberMutilple100(item),
          ),
        },
      });

      const result = await prisma.image.findUnique({
        where: { path: "/path/to/image.jpg" },
        include: { colors: true },
      });

      expect(result?.colors).toHaveLength(2);
      expect(result?.colors).toMatchObject([
        { rgb: rgbToNumberMutilple100(color2) },
        { rgb: rgbToNumberMutilple100(color3) },
      ]);
    });
  });

  it("delete log record after upsert image", async () => {
    await prisma.log.deleteMany();
    await prisma.image.deleteMany();

    await caller.log.upsert({
      path: "/path/to/image.jpg",
      type: "json-error",
      message: "Test log message",
    });

    await caller.image.upsert({
      path: "/path/to/image.jpg",
      name: "image.jpg",
      size: 1024,
      ext: "jpg",
      width: 800,
      height: 600,
      mtime: new Date(),
    });

    expect(
      await prisma.log.findUnique({ where: { path: "/path/to/image.jpg" } }),
    ).toBeNull();
    expect(
      await caller.image.findUnique({ path: "/path/to/image.jpg" }),
    ).toHaveProperty("path", "/path/to/image.jpg");
  });

  describe("deleteByUnique", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
    });

    it("delete by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      expect(
        await caller.image.deleteByUnique({ path: "/path/to/image.jpg" }),
      ).toEqual(testImage);

      expect(
        await caller.image.findUnique({ path: "/path/to/image.jpg" }),
      ).toBeNull();
    });

    it("delete by path", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      expect(await caller.image.deleteByUnique({ id: testImage.id })).toEqual(
        testImage,
      );

      expect(await caller.image.findUnique({ id: testImage.id })).toBeNull();
    });
  });

  describe("find", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
    });

    it("should find all images and nextCursor", async () => {
      for (let i = 0; i < 25; i++) {
        await caller.image.upsert({
          path: `/path/to/image${i}.jpg`,
          name: `image${i}.jpg`,
          size: 1024,
          ext: "jpg",
          width: 800,
          height: 600,
          mtime: new Date(),
        });
      }

      const res = await caller.image.find({
        limit: 24,
        orderBy: { name: "desc" },
      });
      expect(res.data).toHaveLength(24);
      expect(res.nextCursor).toEqual(`/path/to/image0.jpg`);
    });

    it("includes tags, colors, folders", async () => {
      await caller.image.upsert({
        path: `/path/to/image.jpg`,
        name: `image.jpg`,
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
        mtime: new Date(),
      });

      const res = await caller.image.find({
        includes: ["folders", "tags", "colors"],
      });

      expect(res.data).toHaveLength(1);
      expect(res.data[0]).toHaveProperty("folders");
      expect(res.data[0]).toHaveProperty("tags");
      expect(res.data[0]).toHaveProperty("colors");
    });
  });

  describe("findByFolderId", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
      await prisma.folder.deleteMany();
    });

    it("should find all images", async () => {
      const folder = await caller.folder.upsert({
        name: "folder",
        id: "1",
      });

      for (let i = 0; i < 25; i++) {
        await caller.image.upsert({
          path: `/path/to/image${i}.jpg`,
          name: `image${i}.jpg`,
          size: 1024,
          ext: "jpg",
          width: 800,
          height: 600,
          mtime: new Date(),
          folders: {
            connect: ["1"],
          },
        });
      }

      const res = await caller.image.findByFolderId({
        id: folder.id,
        limit: 24,
        orderBy: { name: "desc" },
      });
      expect(res.data).toHaveLength(24);
      expect(res.nextCursor).toEqual(`/path/to/image0.jpg`);
    });

    it("find image but is'not in trash folder.", async () => {
      const folder = await caller.folder.upsert({
        name: "folder",
        id: "123",
        show: true,
      });

      for (let i = 0; i < 20; i++) {
        await caller.image.upsert({
          path: `/path/to/image${i}.jpg`,
          name: `image${i}.jpg`,
          size: 1024,
          ext: "jpg",
          width: 800,
          height: 600,
          mtime: new Date(),
          isDeleted: i % 2 === 0,
          folders: {
            connect: ["123"],
          },
        });
      }

      const res = await caller.image.findByFolderId({
        id: folder.id,
        limit: 24,
        orderBy: { name: "desc" },
      });

      expect(res.data).toHaveLength(10);
    });

    it("find image and two folder", async () => {
      await caller.folder.upsert({
        name: "unsplash",
        id: "unsplash",
        show: true,
      });

      await caller.folder.upsert({
        name: "daisyui",
        id: "daisyui",
        show: true,
      });

      for (let i = 0; i < 20; i++) {
        await caller.image.upsert({
          path: `/path/to/image${i}.jpg`,
          name: `image${i}.jpg`,
          size: 1024,
          ext: "jpg",
          width: 800,
          height: 600,
          mtime: new Date(),
          folders: {
            connect: i % 2 === 0 ? ["unsplash"] : ["daisyui"],
          },
        });
      }

      const res = await caller.image.findByFolderId({
        id: "unsplash",
        limit: 24,
        orderBy: { name: "desc" },
      });

      expect(res.data).toHaveLength(10);

      const res2 = await caller.image.findByFolderId({
        id: "daisyui",
        limit: 24,
        orderBy: { name: "desc" },
      });

      expect(res2.data).toHaveLength(10);
    });

    it("find image and child folder", async () => {
      await caller.folder.upsert({
        name: "unsplash",
        id: "unsplash",
        show: true,
      });

      await caller.folder.upsert({
        name: "apple",
        id: "apple",
        pid: "unsplash",
        show: true,
      });

      for (let i = 0; i < 20; i++) {
        await caller.image.upsert({
          path: `/path/to/image${i}.jpg`,
          name: `image${i}.jpg`,
          size: 1024,
          ext: "jpg",
          width: 800,
          height: 600,
          mtime: new Date(),
          folders: {
            connect: i % 2 === 0 ? ["unsplash"] : ["apple"],
          },
        });
      }

      const res1 = await caller.image.findByFolderId({
        id: "unsplash",
        limit: 24,
        orderBy: { name: "desc" },
      });

      expect(res1.data).toHaveLength(10);

      const res2 = await caller.image.findByFolderId({
        id: "apple",
        limit: 24,
        orderBy: { name: "desc" },
      });

      expect(res2.data).toHaveLength(10);
    });
  });
});
