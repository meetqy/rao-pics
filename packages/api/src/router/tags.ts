import { Curd, ZodInput } from "@acme/curd";

import { t } from "../trpc";

export const tagsRouter = t.router({
  get: t.procedure.input(ZodInput.tag.get).query(({ ctx, input }) => {
    return Curd(ctx.prisma).tag().get(input);
  }),
});
