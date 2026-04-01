import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE, MOCK_SESSION_VALUE } from "@/lib/auth/mock-session";

/**
 * MOCK: sets session cookie after “signup”. Replace with Supabase `signUp` + email verification flow.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string; confirmPassword?: string };
  if (!body.email?.trim() || !body.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  if (body.password !== body.confirmPassword) {
    return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(MOCK_SESSION_COOKIE, MOCK_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
