import { en_us } from "./en-us";
import { zh_cn } from "./zh-cn";
import { zh_tw } from "./zh-tw";

export const languages = {
  en_us,
  zh_cn,
  zh_tw,
};

export type Lang = keyof typeof languages;

export const getLang = (lang: Lang) => {
  return languages[lang];
};
