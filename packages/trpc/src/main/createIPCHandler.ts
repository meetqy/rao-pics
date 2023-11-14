import { ipcMain } from "electron";
import type { BrowserWindow, IpcMainEvent } from "electron";
import type { AnyRouter, inferRouterContext } from "@trpc/server";
import type { Unsubscribable } from "@trpc/server/observable";

import { ELECTRON_TRPC_CHANNEL } from "../constants";
import type { ETRPCRequest } from "../types";
import { handleIPCMessage } from "./handleIPCMessage";
import type { CreateContextOptions } from "./types";

type Awaitable<T> = T | Promise<T>;

const getInternalId = (event: IpcMainEvent, request: ETRPCRequest) => {
  const messageId =
    request.method === "request" ? request.operation.id : request.id;
  return `${event.sender.id}-${event.senderFrame.routingId}:${messageId}`;
};

class IPCHandler<TRouter extends AnyRouter> {
  #windows: BrowserWindow[] = [];
  #subscriptions = new Map<string, Unsubscribable>();

  constructor({
    createContext,
    router,
    windows = [],
  }: {
    createContext?: (
      opts: CreateContextOptions,
    ) => Awaitable<inferRouterContext<TRouter>>;
    router: TRouter;
    windows?: BrowserWindow[];
  }) {
    windows.forEach((win) => this.attachWindow(win));

    ipcMain.on(
      ELECTRON_TRPC_CHANNEL as string,
      (event: IpcMainEvent, request: ETRPCRequest) => {
        void handleIPCMessage({
          router,
          createContext,
          internalId: getInternalId(event, request),
          event,
          message: request,
          subscriptions: this.#subscriptions,
        });
      },
    );
  }

  attachWindow(win: BrowserWindow) {
    if (this.#windows.includes(win)) {
      return;
    }

    this.#windows.push(win);
    this.#attachSubscriptionCleanupHandler(win);
  }

  detachWindow(win: BrowserWindow) {
    this.#windows = this.#windows.filter((w) => w !== win);

    for (const [key, sub] of this.#subscriptions.entries()) {
      if (key.startsWith(`${win.webContents.id}-`)) {
        sub.unsubscribe();
        this.#subscriptions.delete(key);
      }
    }
  }

  #attachSubscriptionCleanupHandler(win: BrowserWindow) {
    win.webContents.on("destroyed", () => {
      this.detachWindow(win);
    });
  }
}

export const createIPCHandler = <TRouter extends AnyRouter>({
  createContext,
  router,
  windows = [],
}: {
  createContext?: (
    opts: CreateContextOptions,
  ) => Promise<inferRouterContext<TRouter>>;
  router: TRouter;
  windows?: Electron.BrowserWindow[];
}) => {
  return new IPCHandler({ createContext, router, windows });
};
