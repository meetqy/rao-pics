import { atom } from "recoil";

export type ConstantMenu = "/" | "/tags" | "/not-tag" | "recycle";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: "/" as ConstantMenu,
});
