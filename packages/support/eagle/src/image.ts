import * as fs from "fs-extra";

import curd from "@acme/curd";
import { type Library } from "@acme/db";

import { type EmitOption, type Metadata } from "../types";

export const createImage = (path: string, library: Library, emit: (option: EmitOption) => void) => {
  try {
    const metadata = fs.readJSONSync(path) as Metadata;

    // curd.image.add({

    // })
  } catch (e) {
    throw e;
  }
};
