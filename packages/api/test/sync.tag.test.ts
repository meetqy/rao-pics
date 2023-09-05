import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { syncTag } from "../src/sync/tag";

describe("syncTag", () => {
  beforeEach(async () => {
    await prisma.tag.deleteMany({});
  });

  afterAll(async () => {
    await prisma.tag.deleteMany({});
  });

  it("should return the correct disconnect and connect arrays", async () => {
    const newTags = ["tag1", "tag2", "tag3"];
    const oldTags = ["tag1", "tag4"];

    const result = await syncTag(newTags, oldTags);

    expect(result).toHaveProperty("disconnect", ["tag4"]);
    expect(result).toHaveProperty("connect", ["tag2", "tag3"]);
    expect(await prisma.tag.findMany({})).toHaveLength(2);
  });

  it("should length 0 if new tags same as old tags", async () => {
    const newTags = ["tag1", "tag2"];
    const oldTags = ["tag1", "tag2"];

    await syncTag(newTags, oldTags);
    expect(await prisma.tag.findMany({})).toHaveLength(0);
  });

  it("should have length 2 if not old tags", async () => {
    const newTags = ["tag1", "tag2"];

    await syncTag(newTags);

    expect(await prisma.tag.findMany({})).toHaveLength(2);
  });

  it("should have length 2 and disconnect length 2 if not new tags", async () => {
    const oldTags = ["tag1", "tag2"];

    await prisma.tag.create({ data: { name: "tag1" } });
    await prisma.tag.create({ data: { name: "tag2" } });

    const result = await syncTag([], oldTags);

    expect(result).toHaveProperty("disconnect", ["tag1", "tag2"]);
    expect(result).toHaveProperty("connect", []);
    expect(await prisma.tag.findMany({})).toHaveLength(2);
  });
});
