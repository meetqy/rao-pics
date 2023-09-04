import { beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { router } from "..";

const caller = router.createCaller({});

describe("image module", () => {
  describe("findUnique", () => {
    beforeEach(async () => {
      await prisma.image.deleteMany();
    });

    it("should find an image by id", async () => {
      const testImage = await caller.image.upsert({
        path: "/path/to/image.jpg",
        name: "image.jpg",
        size: 1024,
        ext: "jpg",
        width: 800,
        height: 600,
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
      });

      const result = await caller.image.findUnique({ path: testImage.path });

      expect(result).toEqual(testImage);
    });

    it("should return null if no image is found", async () => {
      const result = await caller.image.findUnique({ id: 1234 });

      expect(result).toBeNull();
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
        ext: "jpg",
        width: 800,
        height: 600,
        tags: {
          connect: ["tag1", "tag2"],
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
});
