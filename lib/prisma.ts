import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Prisma Studio or Data Browser: Do not know how to serialize a BigInt
// https://github.com/prisma/studio/issues/614
(BigInt.prototype as { [key in string] }).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export default prisma;
