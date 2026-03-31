import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const clientId = process.env.WORKS_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(
      new URL("/admin/login?error=not_configured", process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/auth/callback`,
    scope: "user.read",
    state,
  });

  const res = NextResponse.redirect(
    `https://auth.worksmobile.com/oauth2/v2.0/authorize?${params}`
  );
  res.cookies.set("works_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });
  return res;
}
