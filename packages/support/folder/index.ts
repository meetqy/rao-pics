import { basename, dirname, join } from "path";
import * as fs from "fs-extra";
import sharp from "sharp";
import { uid } from "uid";

import { type Constant } from "@acme/constant";
import curd from "@acme/curd";
import { type Library } from "@acme/db";
import { thumbnailDirCache } from "@acme/util";

type EmitOption = { type: "image" | "folder"; current: number };

interface Props {
  library: Library;
  emit?: (option: EmitOption) => void;
  onError?: (err: unknown) => void;
}

const addFail = (path: string, library: Library) => {
  void curd.fail.create({
    libraryId: library.id,
    path,
  });
};

/**
 * Folder Start
 * https://github.com/rao-pics/rao-pics/issues/227
 *
 * folder id   => folder-1/folder-11/folder-111
 * folder name => folder-111
 */
export const startFolder = (props: Props) => {
  const { library, emit, onError } = props;

  const option: EmitOption = {
    type: "image",
    current: 0,
  };

  // create thumbnail dir by library
  const thumbnailDirCacheByLibraryId = join(thumbnailDirCache, library.id.toString());
  fs.ensureDirSync(thumbnailDirCacheByLibraryId);

  void curd.pending.get({ libraryId: library.id }).then(async (pendings) => {
    for (const p of pendings) {
      try {
        option.current++;
        const filenameAndExt = basename(p.path);
        const folder = dirname(p.path);
        console.log(folder, "folder", "-------");
        const folderId = folder.replace(library.dir + "/", "").replace(/\//g, "-");
        const folderName = folder.split("/").pop();
        const [filename, ext] = filenameAndExt.split(".");
        const stats = fs.statSync(p.path);
        const _uid: string = uid(16);
        const thumbnail = `${filename}-${_uid}.webp`;
        const thumbnailPath = join(thumbnailDirCacheByLibraryId, thumbnail);

        const image = sharp(p.path);
        const metadata = await image.metadata();
        await image.toFormat("webp").resize(400).webp({ quality: 75 }).toFile(thumbnailPath);

        if (p.type === "delete") {
          // // delete
          // await curd.image.delete({ pathStartsWith });
        } else if (p.type === "update") {
          // // update
          // const res = await updateImage(p.path, library);
          // if (!res) addFail(p.path, library);
        } else if (p.type === "create") {
          const res = await curd.image.create({
            libraryId: library.id,
            path: p.path.replace(library.dir + "/", ""),
            name: filename || Date.now().toString(),
            ext: ext as Constant["ext"],
            thumbnailPath: thumbnail,
            size: stats.size,
            createTime: stats.ctime,
            lastTime: stats.mtime,
            width: metadata.width || 0,
            height: metadata.height || 0,
            folders: [{ id: folderId, name: folderName }],
          });

          if (!res) addFail(p.path, library);
        }

        await curd.pending.delete({ path: p.path });
        emit?.(option);
      } catch (e) {
        addFail(p.path, library);
        await curd.pending.delete({ path: p.path });
        onError?.(e);
      }
    }
  });
};
