import "reflect-metadata";

import { DataSource } from "typeorm";

import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
