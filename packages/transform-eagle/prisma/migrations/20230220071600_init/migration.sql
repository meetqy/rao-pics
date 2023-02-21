-- CreateTable
CREATE TABLE "Image" (
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
    "isDeleted" BOOLEAN DEFAULT false,
    "nsfw" BOOLEAN DEFAULT false,
    "deletedTime" BIGINT,
    "processingPalette" BOOLEAN,
    "noThumbnail" BOOLEAN
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Folder" (
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

-- CreateTable
CREATE TABLE "_TagToTagsGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TagToTagsGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagToTagsGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "TagsGroups" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FolderToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FolderToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FolderToImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FolderToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TagsGroups_name_key" ON "TagsGroups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToTag_AB_unique" ON "_ImageToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToTag_B_index" ON "_ImageToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTagsGroups_AB_unique" ON "_TagToTagsGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTagsGroups_B_index" ON "_TagToTagsGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToTag_AB_unique" ON "_FolderToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToTag_B_index" ON "_FolderToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToImage_AB_unique" ON "_FolderToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToImage_B_index" ON "_FolderToImage"("B");
