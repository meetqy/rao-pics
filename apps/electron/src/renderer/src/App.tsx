import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [ipcLink()],
      transformer: superjson,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen w-screen overflow-hidden">
          {/* aside */}
          <aside className="relative flex h-full w-1/4 flex-col">
            <div
              className="h-12 w-full bg-base-200/70"
              style={{ appRegion: "drag" } as React.CSSProperties}
            ></div>

            <div className="scrollbar flex-1 overflow-y-auto bg-base-200/70">
              {/* content */}
              <div>
                {new Array(100).fill(0).map((item, index) => (
                  <p key={index}>{index + 1}</p>
                ))}
              </div>
            </div>
          </aside>

          {/* main */}
          <main className="flex flex-1 flex-col">
            {/* title */}
            <div
              className="drag h-12 w-full"
              style={{ appRegion: "drag" } as React.CSSProperties}
            ></div>

            {/* page */}
            <div className="scrollbar flex-1 overflow-y-auto">
              {new Array(100).fill(0).map((item, index) => (
                <p key={index}>{index + 1}</p>
              ))}
            </div>
          </main>
          {/* <Home /> */}
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
