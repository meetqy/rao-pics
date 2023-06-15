import { Curd, ZodInput } from "@acme/curd";

import { t } from "../trpc";

export const foldersRouter = t.router({
  get: t.procedure.input(ZodInput.folder.get).query(({ ctx, input }) => {
    return Curd(ctx.prisma).folder().get(input);
  }),
});
