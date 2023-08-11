import { beforeAll, describe, expect, it } from "vitest";

import { AppDataSource } from "../src/data-source";

describe("@rao-pics/databse AppDataSource", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  it("should have a type of 'sqlite'", () => {
    expect(AppDataSource.options.type).toBe("sqlite");
  });

  it("should have a database path of './db.sqlite'", () => {
    expect(AppDataSource.options.database).toBe("./db.sqlite");
  });

  it("should have logging enabled", () => {
    expect(AppDataSource.options.logging).toBe(true);
  });

  it("should have migrations run", () => {
    expect(AppDataSource.options.migrationsRun).toBe(true);
  });
});
