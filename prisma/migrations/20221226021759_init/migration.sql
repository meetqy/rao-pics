/*
  Warnings:

  - You are about to drop the column `tagId` on the `TagGroup` table. All the data in the column will be lost.
  - Added the required column `tagGroupId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "tagGroupId" TEXT NOT NULL,
    CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name", "starred") SELECT "id", "name", "starred" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_TagGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT
);
INSERT INTO "new_TagGroup" ("color", "id", "name") SELECT "color", "id", "name" FROM "TagGroup";
DROP TABLE "TagGroup";
ALTER TABLE "new_TagGroup" RENAME TO "TagGroup";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
