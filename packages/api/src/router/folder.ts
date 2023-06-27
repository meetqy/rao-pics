import { Curd, ZodInput } from "@acme/curd";
import { prisma } from "@acme/db";

import { t } from "../trpc";

export const folders = t.router({
  get: t.procedure.input(ZodInput.folder.get).query(({ input }) => {
    return curd.folder.get(input);
  }),
});
