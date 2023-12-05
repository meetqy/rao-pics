import { useEffect, useState } from "react";

import { trpc } from "@rao-pics/trpc";

/**
 * 外观 hook
 */
export function useColor() {
  const utils = trpc.useUtils();
  const { data: config } = trpc.config.findUnique.useQuery();

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

/**
 * 防抖
 * @param value
 * @param delay
 * @returns
 */
export function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 获取站点地址
 * @returns 站点地址
 */
export function useSite() {
  const { data: config } = trpc.config.findUnique.useQuery();

  if (config) {
    if (config.clientSite) {
      return config.clientSite;
    }

    return `http://${config.ip}:${config.clientPort}`;
  }

  return "";
}
