import { type Operation } from "@trpc/client";
import { type TRPCResponse } from "@trpc/server/rpc";

export interface IPCResponse {
  response: TRPCResponse;
}

export type IPCRequestOptions = Operation;
