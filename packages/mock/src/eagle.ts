import { faker } from "@faker-js/faker";

const image = (props: { tags: string[]; folders: string[]; palettes: { color: number[]; ratio: number }[] }) => {
  return {
    id: faker.string.uuid(),
    name: `${faker.system.semver()}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 10, max: 99 })}`,
    size: faker.number.int({ min: 100000, max: 200000 }),
    btime: faker.date.past().getTime(),
    mtime: faker.date.past().getTime(),
    ext: faker.system.fileExt(),
    tags: props.tags,
    folders: props.folders,
    isDeleted: faker.datatype.boolean(),
    url: faker.internet.url(),
    annotation: faker.lorem.sentence(),
    modificationTime: faker.date.past().getTime(),
    height: faker.number.int({ min: 1000, max: 2000 }),
    width: faker.number.int({ min: 500, max: 1000 }),
    noThumbnail: faker.datatype.boolean(),
    palettes: props.palettes,
    lastModified: faker.date.past().getTime(),
  };
};

const tags = () => {
  const tags = [];
  const len = faker.number.int({ min: 1, max: 10 });
  for (let i = 0; i < len; i++) {
    tags.push(faker.animal.dog());
  }

  return tags;
};

const palettes = () => {
  const palettes = [];
  const len = faker.number.int({ min: 1, max: 10 });
  for (let i = 0; i < len; i++) {
    palettes.push({
      color: [faker.number.int({ min: 0, max: 255 }), faker.number.int({ min: 0, max: 255 }), faker.number.int({ min: 0, max: 255 })],
      ratio: faker.number.int({ min: 0, max: 50 }),
    });
  }

  return palettes;
};

const folders = () => {
  let count = 0;
  const ids: string[] = [];

  const create = () => {
    const item = [];
    const len = faker.number.int({ min: 1, max: 10 });

    for (let i = 0; i < len; i++) {
      const id = faker.string.uuid();
      count += 1;
      ids.push(id);
      item.push({
        id,
        name: faker.system.commonFileName(),
      });
    }

    return item;
  };

  const f = create().map((item) => {
    const isChild = faker.datatype.boolean();

    return {
      ...item,
      children: isChild ? create() : [],
    };
  });

  return {
    ids,
    folders: f,
    count,
  };
};

export const eagle = {
  image,
  tags,
  palettes,
  folders,
};
