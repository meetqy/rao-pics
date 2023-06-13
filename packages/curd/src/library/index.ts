import { type PrismaClient } from "@acme/db";

import { libraryGet } from "./get";

function Library(this: PrismaClient) {
  return {
    get: libraryGet.bind(this),
  };
}

export default Library;
