/*
  Warnings:

  - You are about to drop the `TagsGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tagGroupId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TagsGroup";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TagsGroups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "tagsGroupsId" TEXT,
    CONSTRAINT "Tag_tagsGroupsId_fkey" FOREIGN KEY ("tagsGroupsId") REFERENCES "TagsGroups" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name", "starred") SELECT "id", "name", "starred" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
