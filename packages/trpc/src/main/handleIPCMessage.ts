/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { IpcMainEvent } from "electron";
import { TRPCError } from "@trpc/server";
import type { AnyRouter, inferRouterContext } from "@trpc/server";
import type { Unsubscribable } from "@trpc/server/observable";
import { isObservable } from "@trpc/server/observable";
import type { TRPCResponseMessage } from "@trpc/server/rpc";
import { getErrorShape, transformTRPCResponse } from "@trpc/server/shared";

import { ELECTRON_TRPC_CHANNEL } from "../constants";
import type { ETRPCRequest } from "../types";
import type { CreateContextOptions } from "./types";
import { getTRPCErrorFromUnknown } from "./utils";

export async function handleIPCMessage<TRouter extends AnyRouter>({
  router,
  createContext,
  internalId,
  message,
  event,
  subscriptions,
}: {
  router: TRouter;
  createContext?: (
    opts: CreateContextOptions,
  ) => Promise<inferRouterContext<TRouter>>;
  internalId: string;
  message: ETRPCRequest;
  event: IpcMainEvent;
  subscriptions: Map<string, Unsubscribable>;
}) {
  if (message.method === "subscription.stop") {
    const subscription = subscriptions.get(internalId);
    if (!subscription) {
      return;
    }

    subscription.unsubscribe();
    subscriptions.delete(internalId);
    return;
  }

  const { type, input: serializedInput, path, id } = message.operation;

  const input = serializedInput
    ? router._def._config.transformer.input.deserialize(serializedInput)
    : undefined;

  const ctx = (await createContext?.({ event })) ?? {};

  const respond = (response: TRPCResponseMessage) => {
    if (event.sender.isDestroyed()) return;
    event.reply(
      ELECTRON_TRPC_CHANNEL,
      transformTRPCResponse(router._def._config, response),
    );
  };

  try {
    const result = router.createCaller({
      ctx,
      path,
      procedures: router._def.procedures,
      rawInput: input,
      type,
    });

    if (type !== "subscription") {
      respond({
        id,
        result: {
          type: "data",
          data: result,
        },
      });
      return;
    } else {
      if (!isObservable(result)) {
        throw new TRPCError({
          message: `Subscription ${path} did not return an observable`,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }

    const subscription = result.subscribe({
      next(data) {
        respond({
          id,
          result: {
            type: "data",
            data,
          },
        });
      },
      error(err) {
        const error = getTRPCErrorFromUnknown(err);
        respond({
          id,
          error: getErrorShape({
            config: router._def._config,
            error,
            type,
            path,
            input,
            ctx,
          }),
        });
      },
      complete() {
        respond({
          id,
          result: {
            type: "stopped",
          },
        });
      },
    });

    subscriptions.set(internalId, subscription);
  } catch (cause) {
    const error: TRPCError = getTRPCErrorFromUnknown(cause);

    return respond({
      id,
      error: getErrorShape({
        config: router._def._config,
        error,
        type,
        path,
        input,
        ctx,
      }),
    });
  }
}
