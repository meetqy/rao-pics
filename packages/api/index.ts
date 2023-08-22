import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import superjson from "superjson";
import z from "zod";

import { prisma } from "@rao-pics/db";

const ee = new EventEmitter();

const t = initTRPC.create({ isServer: true, transformer: superjson });

export const router = t.router({
  greeting: t.procedure.input(z.object({ name: z.string() })).query((req) => {
    const { input } = req;

    ee.emit("greeting", `Greeted ${input.name}`);
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

  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),

  getUsers: t.procedure.query(async () => {
    return await prisma.user.findMany();
  }),

  deleteUser: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export type AppRouter = typeof router;
