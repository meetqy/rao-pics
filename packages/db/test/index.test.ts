import "chai";

import { join } from "path";
import fs from "fs-extra";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { DB_PATH } from "@rao-pics/constant/server";

import { createDbPath } from "..";

describe("createDbPath", () => {
  const defaultPath = join(__dirname, "..", "prisma", "db.sqlite");

  beforeEach(() => {
    fs.removeSync(DB_PATH);
  });

  afterAll(() => {
    fs.removeSync(DB_PATH);
  });

  it("should throw an error if the default path does not exist", () => {
    expect(() => {
      createDbPath("./test/nonexistent.sqlite");
    }).to.throw(Error, "defaultPath: ./test/nonexistent.sqlite not exist");
  });

  it("should create the db directory if it does not exist", () => {
    createDbPath(defaultPath);
    expect(fs.existsSync(DB_PATH)).to.be.true;
  });

  it("should not overwrite the existing db file by default", () => {
    fs.ensureDirSync(DB_PATH);
    fs.writeFileSync(`${DB_PATH}/db.sqlite`, "existing data");

    expect(createDbPath(defaultPath)).toBeUndefined();
    expect(fs.readFileSync(`${DB_PATH}/db.sqlite`, "utf-8")).to.equal(
      "existing data",
    );
  });
});
