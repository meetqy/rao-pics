import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export type NSFWCONSTAN = "Hentai" | "Porn" | "Sexy" | string;

export const NSFWState = atom({
  key: "nsfw",
  default: [] as NSFWCONSTAN[],
});

export function useNSFW() {
  const nsfw = useLocalStorageState<NSFWCONSTAN[]>("nsfw", {
    defaultValue: [],
  });

  const [, setNsfw] = useRecoilState(NSFWState);

  const [value] = nsfw;

  useEffect(() => {
    setNsfw(value);
  }, [value, setNsfw]);

  return nsfw;
}
