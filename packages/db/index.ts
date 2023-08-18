import { PrismaClient } from "@prisma/client";

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
