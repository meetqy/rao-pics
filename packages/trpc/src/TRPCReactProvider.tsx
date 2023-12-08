import { useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpLink, splitLink, wsLink } from "@trpc/client";
import SuperJSON from "superjson";

import { trpc } from "./trpc";

export const TRPCReactProvider = (props: {
  children: React.ReactNode;
  /** 只需要在主题（客户端）使用自定义域名，electron 中不需要 */
  client?: boolean;
}) => {
  const [site, setSite] = useState<string>();
  /**
   * Fetch 配置信息
   * @param url
   * @returns
   */
  const fetchConfig = useCallback(
    (url: string) =>
      fetch(url)
        // Prod
        .then((res) => res.json())
        .then(
          (data: { ip: string; serverPort: number; clientSite?: string }) => {
            const { ip, serverPort, clientSite } = data;
            if (clientSite && props.client) return setSite(clientSite);

            setSite(`http://${ip}:${serverPort}`);
          },
        ),
    [props.client],
  );

  useEffect(() => {
    const getConfig = () => {
      // Prod
      fetchConfig("/common/config").catch(() => {
        const { hostname } = location;
        // Dev
        void fetchConfig(`http://${hostname}:61122/common/config`);
      });
    };

    if (window) {
      void getConfig();
    }
  }, [fetchConfig]);

  return site && <Core site={site}>{props.children}</Core>;
};

function Core({ children, site }: { children: React.ReactNode; site: string }) {
  const [queryClient] = useState(() => new QueryClient());

  // 匹配 http:// 或 https://
  const host = site.replace(/https?:\/\//g, "");

  const [wsClient] = useState(() =>
    createWSClient({ url: `ws://${host}/trpc` }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpLink({ url: `${site}/trpc` }),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
