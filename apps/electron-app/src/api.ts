import { EventEmitter } from "events";
import * as trpc from "@trpc/server";
import { observable } from "@trpc/server/observable";
import superjson from "superjson";
import { ZodError, z } from "zod";

export const t = trpc.initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const ee = new EventEmitter();

export const appRouter = t.router({
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

export type AppRouter = typeof appRouter;
