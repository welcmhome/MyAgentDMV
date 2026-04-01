/**
 * Placeholder ID generators.
 *
 * Supabase: prefer `gen_random_uuid()` or UUIDv7 in SQL, or Postgres sequences for display numbers
 * (`agent_number_seq`, `license_number_seq`). Replace `generateId` with DB-returned ids in repositories.
 *
 * Sequences below live on globalThis (same pattern as mock memory store) so dev HMR does not reset
 * agent/license numbers mid-session.
 */

const SEQ_KEY = "__admv_id_sequences_v1";

type SeqState = {
  agent: number;
  license: number;
  idNonce: number;
};

function seqState(): SeqState {
  const g = globalThis as unknown as { [SEQ_KEY]?: SeqState };
  if (!g[SEQ_KEY]) {
    g[SEQ_KEY] = { agent: 28400, license: 900, idNonce: 0 };
  }
  return g[SEQ_KEY];
}

export function nextAgentSequence(): number {
  const s = seqState();
  s.agent += 1;
  return s.agent;
}

export function nextLicenseSequence(): number {
  const s = seqState();
  s.license += 1;
  return s.license;
}

/** e.g. AGENT# 45-162 */
export function generateAgentNumber(): string {
  const seq = nextAgentSequence();
  const batch = Math.floor(seq / 1000) % 100;
  const tail = seq % 1000;
  return `AGENT# ${String(batch).padStart(2, "0")}-${String(tail).padStart(3, "0")}`;
}

/** e.g. ADMV-2026-000921 */
export function generateLicenseNumber(): string {
  const year = new Date().getFullYear();
  const n = nextLicenseSequence();
  return `ADMV-${year}-${String(n).padStart(6, "0")}`;
}

export function generateId(prefix: string): string {
  const s = seqState();
  s.idNonce += 1;
  const t = Date.now().toString(36);
  const n = s.idNonce.toString(36);
  const r = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${t}_${n}_${r}`;
}
