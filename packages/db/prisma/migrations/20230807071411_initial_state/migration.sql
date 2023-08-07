-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "thumbnailPath" TEXT,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createTime" DATETIME NOT NULL,
    "lastTime" DATETIME NOT NULL,
    "ext" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "duration" REAL,
    "libraryId" INTEGER NOT NULL,
    CONSTRAINT "Image_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Color" (
    "rgb" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Library" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dir" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lastSyncTime" DATETIME
);

-- CreateTable
CREATE TABLE "Fail" (
    "path" TEXT NOT NULL PRIMARY KEY,
    "libraryId" INTEGER,
    CONSTRAINT "Fail_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pending" (
    "path" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "libraryId" INTEGER,
    CONSTRAINT "Pending_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "libraryId" INTEGER NOT NULL,
    CONSTRAINT "Tag_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "libraryId" INTEGER NOT NULL,
    CONSTRAINT "Folder_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "webPort" INTEGER NOT NULL,
    "assetsPort" INTEGER NOT NULL,
    "ip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ImageToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImageToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ColorToImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ColorToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Color" ("rgb") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColorToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FolderToImage" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FolderToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FolderToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_path_key" ON "Image"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Image_thumbnailPath_key" ON "Image"("thumbnailPath");

-- CreateIndex
CREATE UNIQUE INDEX "Color_rgb_key" ON "Color"("rgb");

-- CreateIndex
CREATE UNIQUE INDEX "Library_dir_key" ON "Library"("dir");

-- CreateIndex
CREATE UNIQUE INDEX "Fail_path_key" ON "Fail"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Pending_path_key" ON "Pending"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_id_key" ON "Folder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Config_id_key" ON "Config"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToTag_AB_unique" ON "_ImageToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToTag_B_index" ON "_ImageToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToImage_AB_unique" ON "_ColorToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorToImage_B_index" ON "_ColorToImage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToImage_AB_unique" ON "_FolderToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToImage_B_index" ON "_FolderToImage"("B");
