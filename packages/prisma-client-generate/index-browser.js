Object.defineProperty(exports, "__esModule", { value: true });

const { Decimal, objectEnumValues, makeStrictEnum } = require("./runtime/index-browser");

const Prisma = {};

exports.Prisma = Prisma;

/**
 * Prisma Client JS version: 4.11.0
 * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
 */
Prisma.prismaVersion = {
  client: "4.11.0",
  engine: "8fde8fef4033376662cad983758335009d522acb",
};

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.validator = () => (val) => val;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) {
  return x;
}

exports.Prisma.FolderScalarFieldEnum = makeEnum({
  id: "id",
  name: "name",
  description: "description",
  pid: "pid",
  modificationTime: "modificationTime",
  iconColor: "iconColor",
  icon: "icon",
  password: "password",
  passwordTips: "passwordTips",
});

exports.Prisma.ImageScalarFieldEnum = makeEnum({
  id: "id",
  name: "name",
  size: "size",
  btime: "btime",
  mtime: "mtime",
  modificationTime: "modificationTime",
  ext: "ext",
  url: "url",
  annotation: "annotation",
  width: "width",
  height: "height",
  metadataMTime: "metadataMTime",
  star: "star",
  palettes: "palettes",
  lastModified: "lastModified",
  deletedTime: "deletedTime",
  isDeleted: "isDeleted",
  resolutionWidth: "resolutionWidth",
  resolutionHeight: "resolutionHeight",
  duration: "duration",
  nsfw: "nsfw",
  processingPalette: "processingPalette",
  noThumbnail: "noThumbnail",
});

exports.Prisma.SortOrder = makeEnum({
  asc: "asc",
  desc: "desc",
});

exports.Prisma.TagScalarFieldEnum = makeEnum({
  id: "id",
  name: "name",
  starred: "starred",
});

exports.Prisma.TagsGroupsScalarFieldEnum = makeEnum({
  id: "id",
  name: "name",
  color: "color",
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: "Serializable",
});

exports.Prisma.ModelName = makeEnum({
  Image: "Image",
  Tag: "Tag",
  Folder: "Folder",
  TagsGroups: "TagsGroups",
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
    );
  }
}
exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
