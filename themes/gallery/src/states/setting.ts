import { atom, selector } from "recoil";

export interface SettingType {
  layout: "masonry" | "responsive";
  orderBy: {
    createdTime: "asc" | "desc";
  };
}

const settingAtom = atom({
  key: "settingState",
  default: {
    layout: "masonry",
    orderBy: {
      createdTime: "desc",
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
