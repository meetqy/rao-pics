import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export const NSFWState = atom({
  key: "nsfw",
  default: false as boolean,
});

export function useNSFW() {
  const nsfw = useLocalStorageState<boolean>("nsfw", {
    defaultValue: false,
  });

  const [, setNsfw] = useRecoilState(NSFWState);

  const [value] = nsfw;

  useEffect(() => {
    setNsfw(value);
  }, [value, setNsfw]);

  return nsfw;
}
