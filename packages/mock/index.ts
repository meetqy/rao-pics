import { faker } from "@faker-js/faker";

import { prisma } from "@acme/db";

import { eagle } from "./src/eagle";

const Mock = {
  // 清空数据库
  dbClean: async () => {
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
