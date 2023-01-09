-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "btime" BIGINT NOT NULL,
    "mtime" BIGINT NOT NULL,
    "ext" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "modificationTime" BIGINT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "star" INTEGER,
    "palettes" TEXT,
    "lastModified" BIGINT NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "deletedTime" BIGINT,
    "processingPalette" BOOLEAN,
    "noThumbnail" BOOLEAN
);
INSERT INTO "new_Image" ("annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width") SELECT "annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
