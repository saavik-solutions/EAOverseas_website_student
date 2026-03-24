import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isApiAuthPage = pathname.startsWith("/api/auth");
  const isPublicPage = pathname === "/" || isAuthPage || isApiAuthPage;

  // 1. Protect all non-public pages
  if (!isAuth && !isPublicPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 2. Redirect away from login if already authenticated
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Redirect away from onboarding if already completed
  if (isAuth && pathname === "/onboarding" && (req.auth?.user as any)?.onboardingCompleted) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};
