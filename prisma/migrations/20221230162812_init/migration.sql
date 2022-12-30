/*
  Warnings:

  - You are about to drop the column `tags` on the `Folder` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FolderToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FolderToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pid" TEXT,
    "modificationTime" BIGINT NOT NULL,
    "iconColor" TEXT,
    "icon" TEXT,
    "password" TEXT NOT NULL,
    "passwordTips" TEXT NOT NULL
);
INSERT INTO "new_Folder" ("description", "icon", "iconColor", "id", "modificationTime", "name", "password", "passwordTips", "pid") SELECT "description", "icon", "iconColor", "id", "modificationTime", "name", "password", "passwordTips", "pid" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToTag_AB_unique" ON "_FolderToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToTag_B_index" ON "_FolderToTag"("B");
