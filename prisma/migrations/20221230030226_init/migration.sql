/*
  Warnings:

  - You are about to drop the column `tags` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folder" ADD COLUMN "icon" TEXT;

-- CreateTable
CREATE TABLE "TagsGroups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "_ImageToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImageToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImageToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "btime" BIGINT NOT NULL,
    "mtime" BIGINT NOT NULL,
    "ext" TEXT NOT NULL,
    "folders" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "modificationTime" BIGINT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "star" INTEGER,
    "palettes" TEXT,
    "lastModified" BIGINT NOT NULL,
    "isDeleted" BOOLEAN,
    "deletedTime" BIGINT,
    "processingPalette" BOOLEAN,
    "noThumbnail" BOOLEAN
);
INSERT INTO "new_Image" ("annotation", "btime", "deletedTime", "ext", "folders", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width") SELECT "annotation", "btime", "deletedTime", "ext", "folders", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new__TagToTagsGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TagToTagsGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagToTagsGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "TagsGroups" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__TagToTagsGroups" ("A", "B") SELECT "A", "B" FROM "_TagToTagsGroups";
DROP TABLE "_TagToTagsGroups";
ALTER TABLE "new__TagToTagsGroups" RENAME TO "_TagToTagsGroups";
CREATE UNIQUE INDEX "_TagToTagsGroups_AB_unique" ON "_TagToTagsGroups"("A", "B");
CREATE INDEX "_TagToTagsGroups_B_index" ON "_TagToTagsGroups"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToTag_AB_unique" ON "_ImageToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToTag_B_index" ON "_ImageToTag"("B");
