import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const SESSION_COOKIE = "admin_session";

function isValidFormat(token: string): boolean {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const payload = token.slice(0, dotIndex);
  return payload.includes(":");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const hasValidSession = !!token && isValidFormat(token);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    if (hasValidSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token && !hasValidSession) {
      const res = NextResponse.next();
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }
    return NextResponse.next();
  }

  if (!hasValidSession) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
