import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setSession } from "@/lib/auth";
import { findUserByWorksId } from "@/lib/users";

const BASE = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("works_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid_state", BASE));
  }

  // 코드 → 토큰 교환
  const tokenRes = await fetch("https://auth.worksmobile.com/oauth2/v2.0/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.WORKS_CLIENT_ID ?? "",
      client_secret: process.env.WORKS_CLIENT_SECRET ?? "",
      redirect_uri: `${BASE}/api/auth/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/admin/login?error=token_failed", BASE));
  }

  const { access_token } = (await tokenRes.json()) as { access_token: string };

  // 사용자 정보 조회
  const userRes = await fetch("https://www.worksapis.com/v1.0/users/me", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(new URL("/admin/login?error=user_failed", BASE));
  }

  const info = (await userRes.json()) as { email?: string; userId?: string; displayName?: string };
  const worksId = info.email ?? info.userId ?? "";

  if (!worksId) {
    return NextResponse.redirect(new URL("/admin/login?error=user_failed", BASE));
  }

  const user = findUserByWorksId(worksId);
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login?error=not_authorized", BASE));
  }
  if (user.status === "disabled") {
    return NextResponse.redirect(new URL("/admin/login?error=disabled", BASE));
  }

  await setSession(user.id, user.role);

  const res = NextResponse.redirect(new URL("/admin", BASE));
  res.cookies.delete("works_state");
  return res;
}
