/**
 * Agent DMV domain types.
 * Supabase-ready: these shapes map cleanly to future tables (agents, evaluations, licenses, registry_view).
 * Row ↔ type mapping will live next to DB adapters under `lib/admv/data` (see `contracts.ts`).
 *
 * Security note: agents are untrusted inputs. Public registry uses RegistryEntry only (safe fields).
 * Internal notes / breakdown stay on Evaluation; never expose raw prompts on public routes.
 */

export type LicenseClassSlug = "sales" | "outreach" | "support" | "scheduling";

export type EntrantType = "agent" | "human";

/** Lifecycle for agents and evaluations */
export type AgentStatus =
  | "pending"
  | "under_review"
  | "passed"
  | "failed"
  | "revoked";

export type EvaluationStatus = "passed" | "failed" | "pending";

export type LicenseStatus = "active" | "revoked" | "pending";

export interface Agent {
  id: string;
  agentNumber: string;
  name: string;
  entrantType: EntrantType;
  licenseClass: LicenseClassSlug;
  status: AgentStatus;
  verified: boolean;
  createdAt: string;
  /** Internal: not exposed on public registry */
  _internalNotes?: string;
}

export interface ScenarioBreakdownItem {
  scenario: string;
  score: number;
}

export interface Evaluation {
  id: string;
  agentId: string;
  licenseClass: LicenseClassSlug;
  status: EvaluationStatus;
  score: number;
  breakdown: ScenarioBreakdownItem[];
  notes: string;
  createdAt: string;
}

export interface License {
  id: string;
  agentId: string;
  licenseNumber: string;
  licenseClass: LicenseClassSlug;
  status: LicenseStatus;
  score: number;
  issuedAt: string;
  evaluationId: string;
}

/** Public-safe row for GET /api/registry */
export interface RegistryEntry {
  agentNumber: string;
  name: string;
  licenseClass: LicenseClassSlug;
  status: AgentStatus | LicenseStatus;
  verified: boolean;
  /** null when agent is queued but not yet scored (pending / under_review). */
  score: number | null;
  issuedAt: string;
  licenseNumber: string;
  agentId: string;
}
