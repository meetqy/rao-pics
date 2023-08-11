import { beforeAll, describe, expect, it } from "vitest";

import {
  AppDataSource,
  Color,
  Config,
  Fail,
  Folder,
  Image,
  Library,
  Pending,
  Tag,
} from "../";
import { Sqlite1691722955348 } from "../src/migration/1691722955348-sqlite";

describe("@rao-pics/database AppDataSource", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  it("should have a type of 'sqlite'", () => {
    expect(AppDataSource.options.type).toBe("sqlite");
  });

  it("should have a database path of './db.sqlite'", () => {
    expect(AppDataSource.options.database).toBe(
      process.env.DATABASE_URL ?? "./db.sqlite",
    );
  });

  it("should have logging enabled", () => {
    expect(AppDataSource.options.logging).toBe(true);
  });

  it("should have an array of entities", () => {
    expect(Array.isArray(AppDataSource.options.entities)).toBe(true);
    expect(AppDataSource.options.entities).toContain(Color);
    expect(AppDataSource.options.entities).toContain(Config);
    expect(AppDataSource.options.entities).toContain(Fail);
    expect(AppDataSource.options.entities).toContain(Image);
    expect(AppDataSource.options.entities).toContain(Library);
    expect(AppDataSource.options.entities).toContain(Pending);
    expect(AppDataSource.options.entities).toContain(Tag);
    expect(AppDataSource.options.entities).toContain(Folder);
  });

  it("should have migrations run", () => {
    expect(AppDataSource.options.migrationsRun).toBe(true);
  });

  it("should have an array of migrations", () => {
    expect(Array.isArray(AppDataSource.options.migrations)).toBe(true);
    expect(AppDataSource.options.migrations).toContain(Sqlite1691722955348);
  });
});
