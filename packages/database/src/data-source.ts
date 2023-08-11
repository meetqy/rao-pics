import "reflect-metadata";

import { DataSource } from "typeorm";

import { Color } from "./entity/Color";
import { ConfigModal } from "./entity/Config";
import { Fail } from "./entity/Fail";
import { Folder } from "./entity/Folder";
import { Image } from "./entity/Image";
import { Library } from "./entity/Library";
import { Pending } from "./entity/Pending";
import { Tag } from "./entity/Tag";
import { Sqlite1691722955348 } from "./migration/1691722955348-sqlite";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  logging: true,
  entities: [Color, ConfigModal, Fail, Image, Library, Pending, Tag, Folder],
  subscribers: [],
  migrationsRun: true,
  migrations: [Sqlite1691722955348],
});
