import { trpc } from "@renderer/utils/trpc";

type Language = "zh-cn" | "en-us" | "zh-tw";

/**
 * Language hook
 * @param languages language object template
 */
export function useLanguage<T>(languages: T) {
  const utils = trpc.useContext();

  const { data: config } = trpc.config.get.useQuery();

  const setLanguage = trpc.config.upsert.useMutation({
    onSuccess: () => {
      void utils.config.invalidate();
    },
  });

  const language = (config?.language ?? "zh-cn") as keyof T;

  return {
    lang: languages[language],
    language,
    setLanguage: (lang: Language) =>
      setLanguage.mutate({
        language: lang,
      }),
  };
}

/**
 * 外观 hook
 */
export function useColor() {
  const utils = trpc.useContext();
  const { data: config } = trpc.config.get.useQuery();

  const setColor = trpc.config.upsert.useMutation({
    onSuccess: () => {
      void utils.config.invalidate();
    },
  });

  const color = config?.color ?? "light";

  return {
    color,
    setColor: (color: string) => setColor.mutate({ color }),
  };
}
