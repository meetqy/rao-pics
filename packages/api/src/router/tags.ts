import { Curd, ZodInput } from "@acme/curd";
import { prisma } from "@acme/db";

import { t } from "../trpc";

export const tags = t.router({
  get: t.procedure.input(ZodInput.tag.get).query(({ input }) => {
    return Curd(prisma).tag().get(input);
  }),
});
