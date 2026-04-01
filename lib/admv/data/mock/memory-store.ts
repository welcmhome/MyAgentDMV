/**
 * In-memory persistence for development and tests.
 * NOT used by API routes directly — only by mock repository implementations in this folder.
 *
 * Supabase: delete usage of this module once DB is wired; repositories will call Supabase instead.
 */

import type { Agent, Evaluation, License } from "../../types";

export type MemoryStoreShape = {
  agentsById: Map<string, Agent>;
  evaluationsById: Map<string, Evaluation>;
  licensesById: Map<string, License>;
  /** agentId -> licenseId (latest) */
  licenseByAgentId: Map<string, string>;
};

const STORE_KEY = "__admv_mock_store_v1";

function emptyStore(): MemoryStoreShape {
  return {
    agentsById: new Map(),
    evaluationsById: new Map(),
    licensesById: new Map(),
    licenseByAgentId: new Map(),
  };
}

export function getMemoryStore(): MemoryStoreShape {
  const g = globalThis as unknown as { [STORE_KEY]?: MemoryStoreShape };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = emptyStore();
  }
  return g[STORE_KEY];
}

export function resetMemoryStoreForTests(): void {
  const g = globalThis as unknown as { [STORE_KEY]?: MemoryStoreShape };
  g[STORE_KEY] = emptyStore();
}
