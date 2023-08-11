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
  /**
   * 更新 config, config 中只有一条记录，id 为 config
   * @param input
   * @returns
   */
  update: async (input: z.infer<(typeof ConfigSchema)["update"]>) => {
    const args = ConfigSchema.update.parse(input);

    const config = new ConfigEntity();
    config.id = "config";

    return await AppDataSource.getRepository(ConfigEntity).save({
      ...config,
      ...args,
    });
  },

  get: async () => {
    const config = await AppDataSource.getRepository(ConfigEntity).findOne({
      where: {
        id: "config",
      },
    });

    if (!config) {
      throw new Error("Config not found");
    }

    return config;
  },
};
