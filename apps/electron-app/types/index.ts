import { Operation } from "@trpc/client";
import { TRPCResponse } from "@trpc/server/rpc";

export interface IPCResponse {
  response: TRPCResponse;
}

export type IPCRequestOptions = Operation;
