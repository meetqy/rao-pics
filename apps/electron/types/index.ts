import { type Operation } from "@trpc/client";
import { type TRPCResponse } from "@trpc/server/rpc";

export interface IPCResponse {
  result: TRPCResponse;
  status: "success" | "error";
}

export type IPCRequestOptions = Operation;
