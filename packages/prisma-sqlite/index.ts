import { spawnSync } from "child_process";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const migrate = () => {
  spawnSync(resolve(__dirname, "./node_modules/prisma/build/index.js"), [
    "migrate",
    "deploy",
  ]);
};

export const createUser = async () => {
  await prisma.user.create({
    data: {
      name: `Alice - ${Math.random()}`,
      email: `alice@prisma2.io - ${Math.random()}`,
    },
  });
};

export const getUsers = async () => {
  const res = await prisma.user.findMany({});
  console.log(res);
  return res;
};
