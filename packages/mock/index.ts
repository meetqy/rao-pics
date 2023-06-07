import { faker } from "@faker-js/faker";

import { prisma } from "@acme/db";

import { eagle, type LocalTestContext } from "./src/eagle";

export interface MockType {
  Eagle: {
    LocalTestContext: LocalTestContext;
  };
}

const Mock = {
  // 清空数据库
  cleanDB: async () => {
    void (await prisma.$transaction([
      prisma.color.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.folder.deleteMany(),
      prisma.image.deleteMany(),
      prisma.library.deleteMany(),
      prisma.config.deleteMany(),
    ]));
  },

  library: (type: "eagle" | "pixcall" | "billfish" = "eagle") => {
    return {
      name: faker.system.fileName(),
      dir: faker.system.directoryPath(),
      type,
    };
  },

  eagle,
};

export default Mock;
