import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";

// 토큰 형식: "{userId}:{role}.{hmac}" — 구형("authenticated.hash")은 거부
function isValidFormat(token: string): boolean {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const payload = token.slice(0, dotIndex);
  return payload.includes(":");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const hasValidSession = !!token && isValidFormat(token);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    if (hasValidSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // 구형/만료 쿠키가 있으면 삭제 후 로그인 페이지 표시
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
