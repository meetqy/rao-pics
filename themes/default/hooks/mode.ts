import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export type Theme = "dark" | "light";

export const ThemeState = atom({
  key: "theme",
  default: "light" as Theme,
});

export function useTheme() {
  const theme = useLocalStorageState<Theme>("mode", {
    defaultValue: "light",
  });

  const [, setThemeState] = useRecoilState(ThemeState);

  const [value] = theme;

  useEffect(() => {
    setThemeState(value);
  }, [value, setThemeState]);

  return theme;
}
