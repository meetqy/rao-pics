import { z } from "zod";

import { t } from "../../trpc";

export const update = {
  sync: t.procedure.input(z.string()).mutation((input) => {
    console.log(input);
  }),
};
