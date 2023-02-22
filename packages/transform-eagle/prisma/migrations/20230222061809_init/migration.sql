/*
  Warnings:

  - You are about to drop the `_FolderToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_FolderToTag_B_index";

-- DropIndex
DROP INDEX "_FolderToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FolderToTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "btime" BIGINT NOT NULL,
    "mtime" BIGINT NOT NULL,
    "modificationTime" BIGINT NOT NULL,
    "ext" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "metadataMTime" BIGINT NOT NULL DEFAULT 0,
    "star" INTEGER,
    "palettes" TEXT,
    "lastModified" BIGINT,
    "deletedTime" BIGINT,
    "isDeleted" BOOLEAN DEFAULT false,
    "nsfw" BOOLEAN DEFAULT false,
    "processingPalette" BOOLEAN,
    "noThumbnail" BOOLEAN
);
INSERT INTO "new_Image" ("annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "metadataMTime", "modificationTime", "mtime", "name", "noThumbnail", "nsfw", "palettes", "processingPalette", "size", "star", "url", "width") SELECT "annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "metadataMTime", "modificationTime", "mtime", "name", "noThumbnail", "nsfw", "palettes", "processingPalette", "size", "star", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
