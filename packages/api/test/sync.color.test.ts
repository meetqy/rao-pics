import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@rao-pics/db";

import { diffColor } from "../src/sync/color";

describe("diffColor", () => {
  beforeEach(async () => {
    await prisma.color.deleteMany({});
  });

  afterAll(async () => {
    await prisma.color.deleteMany({});
  });

  it("should return the correct disconnect and connect arrays", async () => {
    const newColors = [1, 2, 3];
    const oldColors = [1, 4];

    const result = await diffColor(newColors, oldColors);

    expect(result).toHaveProperty("disconnect", [4]);
    expect(result).toHaveProperty("connect", [2, 3]);
    expect(await prisma.color.findMany({})).toHaveLength(2);
  });

  it("should length 0 if new colors same as old colors", async () => {
    const newColors = [1, 2];
    const oldColors = [1, 2];

    await diffColor(newColors, oldColors);
    expect(await prisma.color.findMany({})).toHaveLength(0);
  });

  it("should have length 2 if not old colors", async () => {
    const newColors = [1, 2];

    await diffColor(newColors);
    expect(await prisma.color.findMany({})).toHaveLength(2);
  });
});
