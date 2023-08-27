import { trpc } from "@renderer/utils/trpc";

type Language = "zh-cn" | "en-us" | "zh-tw";

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
