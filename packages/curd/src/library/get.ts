import { type PrismaClient } from "@acme/db";

export function libraryGet(this: PrismaClient) {
  console.log(this);
}
