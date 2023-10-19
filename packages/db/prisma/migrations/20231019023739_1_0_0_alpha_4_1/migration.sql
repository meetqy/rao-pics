-- AlterTable
ALTER TABLE "Config" ADD COLUMN "pwdFolder" BOOLEAN DEFAULT false;
ALTER TABLE "Config" ADD COLUMN "trash" BOOLEAN DEFAULT false;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" DATETIME NOT NULL,
    "mtime" DATETIME NOT NULL,
    "modificationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ext" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "duration" REAL,
    "annotation" TEXT,
    "url" TEXT,
    "blurDataURL" TEXT,
    "noThumbnail" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Image" ("annotation", "blurDataURL", "createdTime", "duration", "ext", "height", "id", "isDeleted", "modificationTime", "mtime", "name", "noThumbnail", "path", "size", "updateTime", "url", "width") SELECT "annotation", "blurDataURL", "createdTime", "duration", "ext", "height", "id", "isDeleted", coalesce("modificationTime", CURRENT_TIMESTAMP) AS "modificationTime", "mtime", "name", "noThumbnail", "path", "size", "updateTime", "url", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");
CREATE UNIQUE INDEX "Image_path_key" ON "Image"("path");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
