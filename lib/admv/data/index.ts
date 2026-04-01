/**
 * Persistence layer entry point.
 *
 * ---------------------------------------------------------------------------
 * Supabase integration (future)
 * ---------------------------------------------------------------------------
 * 1. Add `@supabase/supabase-js` and `@supabase/ssr` (or project pattern).
 * 2. Create `lib/admv/data/supabase/repositories.ts` implementing the same
 *    contracts as `contracts.ts` (AgentRepository, etc.) using:
 *    - `createServerClient` in Route Handlers / Server Components
 *    - Service role only in trusted server paths if bypassing RLS for admin ops
 * 3. Map DB rows ↔ `lib/admv/types` in dedicated mappers.
 * 4. Replace `createMockRepositories()` below with `createSupabaseRepositories(supabase)`
 *    when env vars are set, e.g.:
 *      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
 *        return createSupabaseRepositories(...);
 *      }
 * 5. Registry: prefer a SQL view or RPC returning public-safe columns only.
 * 6. Call `resetRepositoriesForTests()` from test setup when swapping adapters.
 * ---------------------------------------------------------------------------
 */

import type { AdmvRepositories } from "./contracts";
import { createMockRepositories } from "./mock/repositories";
import { resetMemoryStoreForTests } from "./mock/memory-store";

let cached: AdmvRepositories | null = null;

export type { AdmvRepositories, AgentRepository, EvaluationRepository, LicenseRepository } from "./contracts";

/** Returns the active persistence adapter (mock today; Supabase later). */
export function getRepositories(): AdmvRepositories {
  if (!cached) {
    cached = createMockRepositories();
  }
  return cached;
}

/** Clears adapter singleton + in-memory store (tests only). */
export function resetRepositoriesForTests(): void {
  cached = null;
  resetMemoryStoreForTests();
}
