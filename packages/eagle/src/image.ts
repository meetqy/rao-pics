import { readJsonSync } from "fs-extra";

import type { PendingTypeEnum } from "@rao-pics/constant";
import type { Pending } from "@rao-pics/db";

import type { Metadata } from "../types";

export const handleImage = (pending: Pending) => {
  const type = pending.type as PendingTypeEnum;
  const { path } = pending;

  try {
    const metadata = readJsonSync(path) as Metadata;
  } catch (e) {
    throw new Error("read json error");
  }

  switch (type) {
    case "create":
      console.log("create");
      break;
    case "update":
      console.log("update");
      break;
    case "delete":
      console.log("delete");
      break;
  }
};
