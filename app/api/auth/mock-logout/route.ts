import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE } from "@/lib/auth/mock-session";

/**
 * MOCK: clears session cookie. Replace with Supabase `signOut`.
 */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(MOCK_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
