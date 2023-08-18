import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import superjson from "superjson";
import z from "zod";

import { createUser, getUsers } from "@rao-pics/db";

const ee = new EventEmitter();

const t = initTRPC.create({ isServer: true, transformer: superjson });

export const router = t.router({
  getUsers: t.procedure.query(async () => {
    return await getUsers();
  }),

  createUser: t.procedure.mutation(async () => {
    return await createUser();
  }),

  greeting: t.procedure.input(z.object({ name: z.string() })).query((req) => {
    const { input } = req;

    ee.emit(
      "greeting",
      `Greeted ${input.name}, time is ${new Date().toISOString()}`,
    );

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

export type AppRouter = typeof router;
