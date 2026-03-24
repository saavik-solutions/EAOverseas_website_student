import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // getToken automatically uses NEXTAUTH_SECRET from environment
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET } as any);
  const isAuth = !!token;

  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/auth");
  const isApiAuthPage = pathname.startsWith("/api/auth");
  const isPublicPage = pathname === "/" || isAuthPage || isApiAuthPage;

  // Protect all non-public pages
  if (!isAuth && !isPublicPage) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect away from login if already authenticated
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect away from onboarding if already completed
  if (isAuth && pathname === "/onboarding" && (token as any)?.onboardingCompleted) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};
