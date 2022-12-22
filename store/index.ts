import { atom } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: "/" as EagleUse.Menu,
});

export const activeImageState = atom({
  key: "activeImageState",
  default: undefined as EagleUse.Image,
});
