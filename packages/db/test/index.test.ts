import "chai";

import { join } from "path";
import fs from "fs-extra";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { DB_DIRS, PLATFORM } from "@rao-pics/constant";

import { createDbPath } from "..";

describe("createDbPath", () => {
  const defaultPath = join(__dirname, "..", "prisma", "db.sqlite");

  const dbPath = DB_DIRS[PLATFORM];

  beforeEach(() => {
    fs.removeSync(dbPath);
  });

  afterAll(() => {
    fs.removeSync(dbPath);
  });

  it("should throw an error if the default path does not exist", () => {
    expect(() => {
      createDbPath("./test/nonexistent.sqlite");
    }).to.throw(Error, "defaultPath: ./test/nonexistent.sqlite not exist");
  });

  it("should create the db directory if it does not exist", () => {
    createDbPath(defaultPath);
    expect(fs.existsSync(dbPath)).to.be.true;
  });

  it("should not overwrite the existing db file by default", () => {
    fs.ensureDirSync(dbPath);
    fs.writeFileSync(`${dbPath}/db.sqlite`, "existing data");

    expect(createDbPath(defaultPath)).toBeUndefined();
    expect(fs.readFileSync(`${dbPath}/db.sqlite`, "utf-8")).to.equal(
      "existing data",
    );
  });
});
