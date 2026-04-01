import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MOCK_SESSION_COOKIE, MOCK_SESSION_VALUE } from "@/lib/auth/mock-session";

/**
 * MOCK route protection — replace with Supabase session check in middleware
 * (e.g. getUser() or refresh session) once Supabase SSR is configured.
 */
export function middleware(request: NextRequest) {
  const session = request.cookies.get(MOCK_SESSION_COOKIE)?.value;
  const isAuthed = session === MOCK_SESSION_VALUE;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !isAuthed) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if ((pathname === "/login" || pathname === "/signup") && isAuthed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
