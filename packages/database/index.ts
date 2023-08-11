import { AppDataSource } from "./src/data-source";

export { AppDataSource } from "./src/data-source";
export * from "./src/entity/Color";
export * from "./src/entity/Config";
export * from "./src/entity/Fail";
export * from "./src/entity/Image";
export * from "./src/entity/Library";
export * from "./src/entity/Pending";
export * from "./src/entity/Tag";
export * from "./src/entity/Folder";

export const initAppDataSource = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  } catch (err) {
    console.log(err);
  }
};
