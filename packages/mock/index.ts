import { faker } from "@faker-js/faker";

import { prisma } from "@acme/db";

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
};

export default Mock;

export function generateImage(folders: string[]) {
  const max = faker.number.int({ min: 0, max: 10 });
  const f = folders.slice(0, max);

  const image = {
    id: faker.string.uuid(),
    name: `${faker.system.semver()}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 10, max: 99 })}`,
    size: faker.number.int({ min: 100000, max: 200000 }),
    btime: faker.date.past().getTime(),
    mtime: faker.date.past().getTime(),
    ext: faker.system.fileExt(),
    tags: new Array(max).fill(0).map(() => faker.animal.dog()),
    folders: f,
    isDeleted: faker.datatype.boolean(),
    url: faker.internet.url(),
    annotation: faker.lorem.sentence(),
    modificationTime: faker.date.past().getTime(),
    height: faker.number.int({ min: 1000, max: 2000 }),
    width: faker.number.int({ min: 500, max: 1000 }),
    noThumbnail: faker.datatype.boolean(),
    palettes: generatePalettes(),
    lastModified: faker.date.past().getTime(),
  };

  return image;
}

function generatePalettes() {
  const palettes = [];
  for (let i = 0; i < 9; i++) {
    palettes.push({
      color: [faker.number.int({ min: 0, max: 255 }), faker.number.int({ min: 0, max: 255 }), faker.number.int({ min: 0, max: 255 })],
      ratio: faker.number.int({ min: 0, max: 50 }),
    });
  }

  return palettes;
}

export function generateFolders() {
  const folders = [];

  for (let i = 0; i < 10; i++) {
    folders.push({
      id: faker.string.uuid(),
      name: faker.system.commonFileName(),
    });
  }

  return folders;
}
