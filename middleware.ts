import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/library")) {
    const url = req.nextUrl.clone();
    url.pathname = "/api" + url.pathname;
    return NextResponse.rewrite(url);
  }
}
