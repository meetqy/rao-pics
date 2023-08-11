import { spawn } from "child_process";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

export const migrate = () => {
  const cli = resolve(__dirname, "./node_modules/prisma/build/index.js");
  console.log(cli);
  const d = spawn(
    "/Users/meetqy/Desktop/me/rao-pics/packages/prisma-sqlite/node_modules/prisma/build/index.js",
    [
      "migrate",
      "deploy",
      "--schema=/Users/meetqy/Desktop/me/rao-pics/packages/prisma-sqlite/prisma/schema.prisma",
    ],
  );

  d.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  d.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  d.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

export const prisma = new PrismaClient();

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
