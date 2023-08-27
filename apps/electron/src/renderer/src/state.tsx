import { atom } from "recoil";

import type { Config } from "@rao-pics/db";

export const themeState = atom({
  key: "theme",
  default: "",
});

export const languageState = atom({
  key: "language",
  default: "zh-cn",
});

export const configState = atom<Config>({
  key: "config",
});
