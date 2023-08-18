import curd from "@acme/curd";

import { en_us } from "./src/en-us";
import { zh_cn } from "./src/zh-cn";
import { zh_tw } from "./src/zh-tw";

export const languages = {
  zh_cn,
  zh_tw,
  en_us,
};

export type LangKey = keyof typeof languages;

export type Lang = { [key in keyof (typeof languages)["zh_cn"]]: string };

export type Language = { [key in LangKey]: Lang };

export const translations = async () => {
  const config = await curd.config.get();
  const lang = (config?.lang ?? "zh-cn").replace("-", "_") as keyof typeof languages;

  return {
    translation: languages[lang],
    lang,
    config,
  };
};
