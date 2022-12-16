import { atom } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: "/" as EagleUse.Menu,
});
