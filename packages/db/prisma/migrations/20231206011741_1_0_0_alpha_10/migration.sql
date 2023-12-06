-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Config" (
    "name" TEXT NOT NULL PRIMARY KEY DEFAULT 'config',
    "language" TEXT NOT NULL DEFAULT 'zh-cn',
    "color" TEXT NOT NULL DEFAULT 'light',
    "theme" TEXT NOT NULL DEFAULT 'gallery',
    "serverPort" INTEGER NOT NULL DEFAULT 61122,
    "clientPort" INTEGER NOT NULL DEFAULT 61121,
    "clientSite" TEXT,
    "ip" TEXT NOT NULL DEFAULT 'localhost',
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "pwdFolder" BOOLEAN NOT NULL DEFAULT false,
    "startDiffLibrary" BOOLEAN NOT NULL DEFAULT false,
    "autoSync" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Config" ("autoSync", "clientPort", "color", "ip", "language", "name", "pwdFolder", "serverPort", "startDiffLibrary", "theme", "trash") SELECT "autoSync", "clientPort", "color", "ip", "language", "name", "pwdFolder", "serverPort", "startDiffLibrary", "theme", "trash" FROM "Config";
DROP TABLE "Config";
ALTER TABLE "new_Config" RENAME TO "Config";
CREATE UNIQUE INDEX "Config_name_key" ON "Config"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
