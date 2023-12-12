import { atom, selector } from "recoil";

export interface SettingType {
  layout: "masonry" | "responsive";
  orderBy: {
    mtime?: "asc" | "desc";
    modificationTime?: "asc" | "desc";
  };
  openFolderIds: string[];
  count: number;
  trashCount: number;
  shuffle?: boolean;
}

export const defaultSetting: SettingType = {
  layout: "masonry",
  orderBy: {
    modificationTime: "desc",
  },
  openFolderIds: [],
  count: 0,
  trashCount: 0,
  shuffle: false,
};

const settingAtom = atom({
  key: "settingState",
  default: defaultSetting,
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
