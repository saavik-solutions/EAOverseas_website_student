import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  
  // v5/Auth.js uses 'authjs.session-token' as default name
  // Vercel adds '__Secure-' prefix in production
  const cookieName = process.env.NODE_ENV === "production" 
    ? "__Secure-authjs.session-token" 
    : "authjs.session-token";

  const token = await getToken({ 
    req, 
    secret, 
    salt: cookieName, // NextAuth v5 uses cookie name as salt for some reason in certain builds
  } as any);

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isApiAuthPage = pathname.startsWith("/api/auth");
  const isPublicPage = pathname === "/" || isAuthPage || isApiAuthPage;

  // 1. Protect all non-public pages
  if (!isAuth && !isPublicPage) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect away from login if already authenticated
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Redirect away from onboarding if already completed
  if (isAuth && pathname === "/onboarding" && (token as any)?.onboardingCompleted) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)"],
};
