import { atom, selector } from "recoil";

export interface SettingType {
  layout: "masonry" | "responsive";
  orderBy: {
    mtime?: "asc" | "desc";
    modificationTime?: "asc" | "desc";
  };
}

const settingAtom = atom({
  key: "settingState",
  default: {
    layout: "masonry",
    orderBy: {
      modificationTime: "desc",
    },
  } as SettingType,
});

export const settingSelector = selector({
  key: "settingSelector",
  get: ({ get }) => {
    return get(settingAtom);
  },
  set: ({ set }, newSetting) => {
    localStorage.setItem("setting", JSON.stringify(newSetting));
    set(settingAtom, newSetting);
  },
});
