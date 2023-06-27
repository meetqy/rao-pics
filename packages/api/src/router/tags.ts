import curd, { ZodInput } from "@acme/curd";

import { t } from "../trpc";

export const tags = t.router({
  get: t.procedure.input(ZodInput.tag.get).query(({ input }) => {
    return curd.tag.get(input);
  }),
});
