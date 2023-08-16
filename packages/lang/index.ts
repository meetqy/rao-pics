import curd from "@acme/curd";

import { en_us } from "./src/en-us";
import { zh_cn } from "./src/zh-cn";
import { zh_tw } from "./src/zh-tw";

const json = {
  zh_cn,
  zh_tw,
  en_us,
};

export const translations = async () => {
  const config = await curd.config.get();
  const lang = (config?.lang ?? "zh-cn").replace("-", "_") as keyof typeof json;

  return {
    translation: json[lang],
    lang,
    config,
  };
};
