/*
  Warnings:

  - You are about to drop the column `tagsGroupsId` on the `Tag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_TagToTagsGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TagToTagsGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagToTagsGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "TagsGroups" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Tag" ("id", "name", "starred") SELECT "id", "name", "starred" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTagsGroups_AB_unique" ON "_TagToTagsGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTagsGroups_B_index" ON "_TagToTagsGroups"("B");
