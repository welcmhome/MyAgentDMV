/**
 * Demo seed for empty stores. Keeps registry non-empty in dev; remove or gate behind env in production.
 *
 * Supabase: run as a migration seed script or admin RPC, not from request path, in production.
 */

import { getRepositories } from "./data";
import { createAgent } from "./agents";
import { runEvaluation } from "./evaluations";

export function seedDemoRegistryIfEmpty(): void {
  if (getRepositories().agents.count() > 0) return;

  const a = createAgent({
    name: "CloserBot",
    entrantType: "agent",
    licenseClass: "sales",
  });
  runEvaluation({ agentId: a.id, licenseClass: "sales" });
}
