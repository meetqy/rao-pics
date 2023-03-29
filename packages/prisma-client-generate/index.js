Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  findSync,
} = require("./runtime/library");

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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
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

const path = require("path");

const fs = require("fs");

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== "undefined" && __dirname !== "/";

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, "schema.prisma")) && __dirname;

// if the client has been bundled, we need to look for the folders
const foundDirname =
  !regularDirname &&
  findSync(process.cwd(), ["../prisma-client-generate", "prisma-client-generate"], ["d"], ["d"], 1)[0];

const dirname = regularDirname || foundDirname || __dirname;

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

const dmmfString =
  '{"datamodel":{"enums":[],"models":[{"name":"Image","dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"size","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"btime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"mtime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"modificationTime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"ext","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"url","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"annotation","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"width","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"height","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"metadataMTime","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"BigInt","default":"0","isGenerated":false,"isUpdatedAt":false},{"name":"star","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"palettes","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastModified","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"deletedTime","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"isDeleted","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"resolutionWidth","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"resolutionHeight","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"nsfw","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"processingPalette","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","isGenerated":false,"isUpdatedAt":false},{"name":"noThumbnail","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","isGenerated":false,"isUpdatedAt":false},{"name":"folders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Folder","relationName":"FolderToImage","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"tags","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tag","relationName":"ImageToTag","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},{"name":"Tag","dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"starred","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"tagsGroups","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TagsGroups","relationName":"TagToTagsGroups","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"images","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Image","relationName":"ImageToTag","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},{"name":"Folder","dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"pid","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"modificationTime","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","isGenerated":false,"isUpdatedAt":false},{"name":"iconColor","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"icon","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"passwordTips","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"images","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Image","relationName":"FolderToImage","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},{"name":"TagsGroups","dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"color","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"tags","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tag","relationName":"TagToTagsGroups","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}],"types":[]},"mappings":{"modelOperations":[{"model":"Image","plural":"images","findUnique":"findUniqueImage","findUniqueOrThrow":"findUniqueImageOrThrow","findFirst":"findFirstImage","findFirstOrThrow":"findFirstImageOrThrow","findMany":"findManyImage","create":"createOneImage","delete":"deleteOneImage","update":"updateOneImage","deleteMany":"deleteManyImage","updateMany":"updateManyImage","upsert":"upsertOneImage","aggregate":"aggregateImage","groupBy":"groupByImage"},{"model":"Tag","plural":"tags","findUnique":"findUniqueTag","findUniqueOrThrow":"findUniqueTagOrThrow","findFirst":"findFirstTag","findFirstOrThrow":"findFirstTagOrThrow","findMany":"findManyTag","create":"createOneTag","delete":"deleteOneTag","update":"updateOneTag","deleteMany":"deleteManyTag","updateMany":"updateManyTag","upsert":"upsertOneTag","aggregate":"aggregateTag","groupBy":"groupByTag"},{"model":"Folder","plural":"folders","findUnique":"findUniqueFolder","findUniqueOrThrow":"findUniqueFolderOrThrow","findFirst":"findFirstFolder","findFirstOrThrow":"findFirstFolderOrThrow","findMany":"findManyFolder","create":"createOneFolder","delete":"deleteOneFolder","update":"updateOneFolder","deleteMany":"deleteManyFolder","updateMany":"updateManyFolder","upsert":"upsertOneFolder","aggregate":"aggregateFolder","groupBy":"groupByFolder"},{"model":"TagsGroups","plural":"tagsGroups","findUnique":"findUniqueTagsGroups","findUniqueOrThrow":"findUniqueTagsGroupsOrThrow","findFirst":"findFirstTagsGroups","findFirstOrThrow":"findFirstTagsGroupsOrThrow","findMany":"findManyTagsGroups","create":"createOneTagsGroups","delete":"deleteOneTagsGroups","update":"updateOneTagsGroups","deleteMany":"deleteManyTagsGroups","updateMany":"updateManyTagsGroups","upsert":"upsertOneTagsGroups","aggregate":"aggregateTagsGroups","groupBy":"groupByTagsGroups"}],"otherOperations":{"read":[],"write":["executeRaw","queryRaw"]}}}';
const dmmf = JSON.parse(dmmfString);
exports.Prisma.dmmf = JSON.parse(dmmfString);

/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value: "/Users/qymeet/Desktop/Github/raopics/core/packages/prisma-client-generate",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [],
    previewFeatures: [],
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
  },
  relativePath: "../prisma-client/prisma",
  clientVersion: "4.11.0",
  engineVersion: "8fde8fef4033376662cad983758335009d522acb",
  datasourceNames: ["db"],
  activeProvider: "sqlite",
  dataProxy: false,
};
config.dirname = dirname;
config.document = dmmf;

const { warnEnvConflicts } = require("./runtime/library");

warnEnvConflicts({
  rootEnvPath:
    config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath:
    config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath),
});

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);

path.join(__dirname, "libquery_engine-darwin.dylib.node");
path.join(process.cwd(), "../prisma-client-generate/libquery_engine-darwin.dylib.node");
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "../prisma-client-generate/schema.prisma");
