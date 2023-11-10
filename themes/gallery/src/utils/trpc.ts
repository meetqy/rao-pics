import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@rao-pics/api";

export const trpc = createTRPCReact<AppRouter>();
