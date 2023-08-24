import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import appIcon from "../../../build/icon.png";
import { Menu } from "./components/Menu";
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
              <div className="flex h-12 w-full items-center px-4 font-mono">
                <img
                  className="h-10 w-10 shrink-0"
                  src={appIcon}
                  alt="app icon"
                />
                <div className="ml-2 flex flex-1 flex-col font-mono">
                  <p>
                    <span className="font-bold text-primary">rao</span>.pics
                  </p>
                  <p className="text-xs text-base-content/60">v1.0.0</p>
                </div>
              </div>

              {/* content */}
              <Menu />
            </div>
          </aside>

          {/* main */}
          <main className="flex flex-1 flex-col">
            {/* title */}
            <div
              className="drag h-12 w-full"
              style={{ appRegion: "drag" } as React.CSSProperties}
            />

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
