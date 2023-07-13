import { prisma } from "@acme/db";

export const Util = {
  dbClean: async () => {
    return await prisma.$transaction([
      prisma.color.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.folder.deleteMany(),
      prisma.image.deleteMany(),
      prisma.library.deleteMany(),
      prisma.config.deleteMany(),
    ]);
  },
};
