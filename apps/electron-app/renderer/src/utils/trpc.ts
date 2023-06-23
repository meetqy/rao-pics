import type { AppRouter } from "../../../api/router/index";
import { createTRPCReact } from "@trpc/react-query";
import type { GetInferenceHelpers } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();

export type InferProcedures = GetInferenceHelpers<AppRouter>;
