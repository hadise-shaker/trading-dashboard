import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
  const path = request.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.redirect(
      new URL(isLoggedIn ? "/dashboard" : "/auth", request.url)
    );
  }

  if (!isLoggedIn && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isLoggedIn && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth"],
};