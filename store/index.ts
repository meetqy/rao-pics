import { atom } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: "/" as EagleUse.Menu,
});

export const activeImageState = atom({
  key: "activeImageState",
  default: undefined as EagleUse.Image,
});

export const tagsState = atom({
  key: "tagsState",
  default: [] as EagleUse.Tag[],
});

export const countState = atom({
  key: "countState",
  default: {
    all: 0,
    "not-tag": 0,
    tags: 0,
    recycle: 0,
  },
});
