import { atom } from "recoil";

export const tagsState = atom({
  key: "tagsState",
  default: [] as EagleUse.TagWithCountImage[],
});

export const foldersState = atom({
  key: "foldersState",
  default: [] as EagleUse.Folder[],
});
