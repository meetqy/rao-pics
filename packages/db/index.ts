import { PrismaClient } from "@prisma/client";

const _prisma: PrismaClient = new PrismaClient();

export * from "@prisma/client";
export const prisma = _prisma;
