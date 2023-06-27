import curd, { ZodInput } from "@acme/curd";

import { t } from "../trpc";

export const folders = t.router({
  get: t.procedure.input(ZodInput.folder.get).query(({ input }) => {
    return curd.folder.get(input);
  }),
});
