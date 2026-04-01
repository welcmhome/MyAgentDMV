/**
 * Public registry projection. Only exposes fields safe for unauthenticated listing.
 *
 * Supabase: replace listPublicRegistry() body with a query against a view (e.g. `registry_public`)
 * or RPC that joins agents, licenses, evaluations with RLS-safe columns only.
 */

import type { Evaluation, RegistryEntry } from "./types";
import { getRepositories } from "./data";
import { LICENSE_CLASS_LABEL } from "./license-classes";
import { getAgentById } from "./agents";
import { getLicenseByAgentId } from "./licenses";

export function listPublicRegistry(): RegistryEntry[] {
  const repos = getRepositories();
  const licensed = new Map<string, RegistryEntry>();

  for (const lic of repos.licenses.listAll()) {
    const agent = getAgentById(lic.agentId);
    if (!agent) continue;
    licensed.set(agent.id, {
      agentId: agent.id,
      agentNumber: agent.agentNumber,
      name: agent.name,
      licenseClass: lic.licenseClass,
      status: lic.status === "active" ? "passed" : lic.status,
      verified: agent.verified,
      score: lic.score,
      issuedAt: lic.issuedAt,
      licenseNumber: lic.licenseNumber,
    });
  }

  const latestFailedByAgent = new Map<string, Evaluation>();
  for (const ev of repos.evaluations.listAll()) {
    if (ev.status !== "failed") continue;
    if (getLicenseByAgentId(ev.agentId)) continue;
    const prev = latestFailedByAgent.get(ev.agentId);
    if (!prev || ev.createdAt > prev.createdAt) {
      latestFailedByAgent.set(ev.agentId, ev);
    }
  }

  const failedRows: RegistryEntry[] = [];
  const failedAgentIds = new Set<string>();
  for (const ev of latestFailedByAgent.values()) {
    const agent = getAgentById(ev.agentId);
    if (!agent) continue;
    failedAgentIds.add(agent.id);
    failedRows.push({
      agentId: agent.id,
      agentNumber: agent.agentNumber,
      name: agent.name,
      licenseClass: ev.licenseClass,
      status: "failed",
      verified: agent.verified,
      score: ev.score,
      issuedAt: ev.createdAt,
      licenseNumber: "—",
    });
  }

  const queueRows: RegistryEntry[] = [];
  for (const agent of repos.agents.listAll()) {
    if (licensed.has(agent.id)) continue;
    if (failedAgentIds.has(agent.id)) continue;
    if (agent.status === "pending" || agent.status === "under_review") {
      queueRows.push({
        agentId: agent.id,
        agentNumber: agent.agentNumber,
        name: agent.name,
        licenseClass: agent.licenseClass,
        status: agent.status,
        verified: agent.verified,
        score: null,
        issuedAt: agent.createdAt,
        licenseNumber: "—",
      });
    }
  }

  return [...licensed.values(), ...failedRows, ...queueRows].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}

/** Map slug to display label for UI */
export function licenseClassDisplay(slug: RegistryEntry["licenseClass"]): string {
  return LICENSE_CLASS_LABEL[slug];
}
