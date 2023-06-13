import { type PrismaClient } from "@acme/db";

import Library from "./src/library";

function Curd(prisma: PrismaClient) {
  return {
    library: Library.bind(prisma),
  };
}

export default Curd;
