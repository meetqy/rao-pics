"use client";

import { RecoilRoot } from "recoil";

import { TRPCReactProvider } from "@rao-pics/trpc";

export const RecoilRootWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const TRPCReactProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <TRPCReactProvider client>{children}</TRPCReactProvider>;
};
