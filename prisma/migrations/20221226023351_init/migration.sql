/*
  Warnings:

  - You are about to drop the `TagGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TagGroup";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TagsGroup" (
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
    "tagGroupId" TEXT,
    CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagsGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name", "starred", "tagGroupId") SELECT "id", "name", "starred", "tagGroupId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
