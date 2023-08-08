import curd, { ZodInput } from "@acme/curd";

import { t } from "../trpc";

export const fail = t.router({
  get: t.procedure.input(ZodInput.fail.get).query(({ input }) => {
    return curd.fail.get(input);
  }),
});
