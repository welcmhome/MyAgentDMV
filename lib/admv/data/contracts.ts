/**
 * Persistence contracts for Agent DMV.
 *
 * Supabase migration path:
 * - Implement these interfaces with Supabase client calls (server-only, service role or RLS-aware).
 * - Map rows ↔ domain types in `lib/admv/data/supabase/mappers.ts` (to be added).
 * - Prefer one module per table or use RPC/views for registry reads.
 * - Keep JSON columns (breakdown) aligned with Evaluation shape or normalize to child table.
 */

import type { Agent, Evaluation, License } from "../types";

/** Agent rows: `agents` table — future columns match Agent (minus _internalNotes if moved to separate table). */
export interface AgentRepository {
  save(agent: Agent): void;
  findById(id: string): Agent | undefined;
  update(id: string, patch: Partial<Agent>): Agent | undefined;
  /** Full scan for registry queue projection; replace with targeted SQL later. */
  listAll(): Agent[];
  count(): number;
}

/** Evaluation rows: `evaluations` table. */
export interface EvaluationRepository {
  save(evaluation: Evaluation): void;
  findById(id: string): Evaluation | undefined;
  listAll(): Evaluation[];
}

/** License rows: `licenses` table + agent_id / evaluation_id FKs. */
export interface LicenseRepository {
  save(license: License): void;
  findById(id: string): License | undefined;
  findByAgentId(agentId: string): License | undefined;
  findByEvaluationId(evaluationId: string): License | undefined;
  listAll(): License[];
}

export type AdmvRepositories = {
  agents: AgentRepository;
  evaluations: EvaluationRepository;
  licenses: LicenseRepository;
};
