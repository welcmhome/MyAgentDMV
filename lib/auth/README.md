# Authentication (developer note)

**Authentication is mocked for local development and UI scaffolding.** There is no Supabase project, database, or real OAuth wired yet.

- **Mock behavior:** Successful login/signup sets an HTTP-only cookie (`adm_mock_session`). Middleware treats that cookie as “authenticated” and allows access to `/dashboard`. Logout clears the cookie.
- **Replacing with Supabase:** Remove mock API routes under `app/api/auth/mock-*`, replace forms with `supabase.auth.signInWithPassword` / `signUp` / `signInWithOAuth`, use `@supabase/ssr` for cookies and middleware session refresh, and delete `MOCK_SESSION_COOKIE` usage in `middleware.ts`.

See inline `// TODO: Supabase` comments in auth components and API routes.
