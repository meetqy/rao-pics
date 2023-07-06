import { join } from "path";
import * as fs from "fs-extra";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { handleFolder } from "./src/folder";
import { createImage, updateImage } from "./src/image";
import { type EmitOption, type LibraryMetadata } from "./types";

interface Props {
  library: Library;
  emit?: (option: EmitOption) => void;
  onError?: (err: unknown) => void;
}

export const start = async (props: Props) => {
  const { library, emit, onError } = props;

  try {
    const base = fs.readJSONSync(join(library.dir, "./metadata.json")) as LibraryMetadata;
    await handleFolder(base.folders, library, emit);

    const option: EmitOption = {
      type: "image",
      current: 0,
    };

    const addFail = (path: string, library: Library) => {
      void curd.fail.create({
        libraryId: library.id,
        path,
      });
    };

    void curd.pending.get({ libraryId: library.id }).then(async (pendings) => {
      for (const p of pendings) {
        option.current++;
        try {
          if (p.type === "delete") {
            // delete
            await curd.image.delete({ path: p.path });
          } else if (p.type === "update") {
            // update
            const res = await updateImage(p.path, library);
            if (!res) addFail(p.path, library);
          } else if (p.type === "create") {
            // create
            const res = await createImage(p.path, library);
            if (!res) addFail(p.path, library);
          }

          await curd.pending.delete({ path: p.path });
        } catch (e) {
          addFail(p.path, library);
          await curd.pending.delete({ path: p.path });
          onError?.(e);
        }

        emit?.(option);
      }
    });
  } catch (e) {
    console.error(e);
    onError?.(e);
  }
};
