-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "tagGroupId" TEXT,
    CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("id", "name", "starred", "tagGroupId") SELECT "id", "name", "starred", "tagGroupId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
