import { z } from "zod";

import { AppDataSource, Config as ConfigEntity } from "@rao-pics/database";

export const ConfigSchema = {
  update: z.object({
    assetsPort: z.number(),
    ip: z.string(),
    webPort: z.number(),
  }),
};

export const Config = {
  update: async (input: z.infer<(typeof ConfigSchema)["update"]>) => {
    const args = ConfigSchema.update.parse(input);

    const config = new ConfigEntity();
    config.id = "config";

    return await AppDataSource.getRepository(ConfigEntity).save({
      ...config,
      ...args,
    });
  },
};
