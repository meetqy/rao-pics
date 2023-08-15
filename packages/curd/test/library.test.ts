import { faker } from "@faker-js/faker";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { CONSTANT } from "@acme/constant";
import { prisma, type Prisma } from "@acme/db";

import { Library } from "../src/library";
import { Util } from "../src/util";

const createMany = async (libs: Prisma.LibraryCreateInput[]) => {
  return await Promise.all(libs.map((l) => prisma.library.create({ data: l })));
};

const mockLib = (name?: string, dir?: string): Prisma.LibraryCreateInput => ({
  name: name || faker.system.fileName(),
  dir: dir || faker.system.filePath(),
  type: faker.helpers.arrayElement(CONSTANT["APP"]),
});

describe("@acme/curd Library", () => {
  beforeEach(async () => {
    await Util.dbClean();
  });

  afterEach(async () => {
    await Util.dbClean();
  });

  describe("get", () => {
    beforeAll;

    it("returns all libraries when no input is provided", async () => {
      // Create some test data
      const libs = await createMany([mockLib("Library 1"), mockLib("Library 2")]);

      // Call the function being tested
      const result = await Library.get(undefined);

      console.log(result, libs);

      // Assert that the result is correct
      expect(result).toEqual([expect.objectContaining({ name: libs[0]?.name }), expect.objectContaining({ name: libs[1]?.name })]);
    });

    it("returns a single library by ID", async () => {
      // Create some test data
      const library = await prisma.library.create({
        data: mockLib(),
      });

      // Call the function being tested
      const result = await Library.get({ library: library.id });

      // Assert that the result is correct
      expect(result).toEqual([expect.objectContaining({ id: library.id })]);
    });

    it("returns a single library by name", async () => {
      // Create some test data
      const library = await prisma.library.create({
        data: { name: "Library 1", dir: "/path/to/library1", type: "eagle" },
      });

      // Call the function being tested
      const result = await Library.get({ library: library.name });

      // Assert that the result is correct
      expect(result).toEqual([expect.objectContaining({ id: library.id })]);
    });

    it("returns multiple libraries by name", async () => {
      // Create some test data
      await createMany([
        { name: "Library 1", dir: "/path/to/library1", type: "eagle" },
        { name: "Library 2", dir: "/path/to/library2", type: "pixcall" },
      ]);

      // Call the function being tested
      const result = await Library.get({ library: "Library" });

      // Assert that the result is correct
      expect(result).toEqual([expect.objectContaining({ name: "Library 1" }), expect.objectContaining({ name: "Library 2" })]);
    });

    // TODO:  _count 情况未测试。
  });

  describe("create", () => {
    it("creates a new library", async () => {
      // Call the function being tested
      const result = await Library.create({
        name: "Library 1",
        dir: "/path/to/library1",
        type: "eagle",
      });

      // Assert that the result is correct
      expect(result).toEqual(expect.objectContaining({ name: "Library 1" }));

      // Assert that the library was created in the database
      const library = await prisma.library.findUnique({ where: { id: result.id } });
      expect(library).toEqual(expect.objectContaining({ name: "Library 1" }));
    });
  });

  // TODO: 删除待测试
});
