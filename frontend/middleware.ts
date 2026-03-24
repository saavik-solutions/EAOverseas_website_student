import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuth = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isApiAuthPage = pathname.startsWith("/api/auth");
  const isPublicPage = pathname === "/" || isAuthPage || isApiAuthPage || pathname.startsWith("/images") || pathname.startsWith("/icons");

  // 1. Protect all non-public pages
  if (!isAuth && !isPublicPage) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Disabled: Redirect away from login if already authenticated
  // This was causing infinite loops in environments with flaky session hydration.
  // if (isAuth && isAuthPage) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // 3. Removed: Redirect away from onboarding (not used anymore)

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};
