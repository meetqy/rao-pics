import "reflect-metadata";

import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { Sqlite1691650913914 } from "./migration/1691650913914-sqlite";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  logging: true,
  entities: [User],
  subscribers: [],
  migrationsRun: true,
  migrations: [Sqlite1691650913914],
});
