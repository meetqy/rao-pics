/*
  Warnings:

  - You are about to drop the column `folders` on the `Image` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FolderToImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FolderToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO "new_Image" ("annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width") SELECT "annotation", "btime", "deletedTime", "ext", "height", "id", "isDeleted", "lastModified", "modificationTime", "mtime", "name", "noThumbnail", "palettes", "processingPalette", "size", "star", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToImage_AB_unique" ON "_FolderToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToImage_B_index" ON "_FolderToImage"("B");
