/**
 * MOCK SESSION — replace with Supabase session handling.
 *
 * Today: a simple HTTP-only cookie flags “signed in” for UI + route protection.
 * Later: use Supabase `createServerClient` + `getSession()` / `auth.getUser()` in
 * middleware and server components, and remove MOCK_SESSION_COOKIE entirely.
 */

/** Cookie name for mock auth only. Swap for Supabase cookie strategy when wired. */
export const MOCK_SESSION_COOKIE = "adm_mock_session";

/** Value stored when mock session is active. */
export const MOCK_SESSION_VALUE = "1";
