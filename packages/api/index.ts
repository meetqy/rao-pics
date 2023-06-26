import { EventEmitter } from "events";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import { config } from "./src/router/config";
import { folders } from "./src/router/folder";
import { image } from "./src/router/image";
import { library } from "./src/router/library";
import { tags } from "./src/router/tags";
import { t } from "./src/trpc";

export * from "./src/router/library";
export { type ExtEnum } from "./src/router/image/get";

const ee = new EventEmitter();

const base = t.router({
  greeting: t.procedure.input(z.object({ name: z.string() })).query((req) => {
    const { input } = req;

    setInterval(() => {
      ee.emit("greeting", `Greeted ${input.name} ${Date.now()}`);
    }, 1000);

    return {
      text: `Hello ${input.name}` as const,
    };
  }),
  subscription: t.procedure.subscription(() => {
    return observable((emit) => {
      function onGreet(text: string) {
        emit.next({ text });
      }

      ee.on("greeting", onGreet);

      return () => {
        ee.off("greeting", onGreet);
      };
    });
  }),
});

export const appRouter = t.router({
  library,
  base,
  tags,
  image,
  folders,
  config,
});

// export type definition of API
export type AppRouter = typeof appRouter;
