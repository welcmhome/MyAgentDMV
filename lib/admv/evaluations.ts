/**
 * Mock evaluation engine. Future: sandboxed runner, external scorer, human review queue.
 * Persistence: evaluations + agent updates go through lib/admv/data (Supabase-ready).
 */

import type { LicenseType } from "@/data/licenses";
import { SCENARIOS } from "@/data/licenses";
import type { Evaluation, LicenseClassSlug } from "./types";
import { generateId } from "./ids";
import { getRepositories } from "./data";
import { isLicenseClassSlug, LICENSE_CLASS_LABEL } from "./license-classes";
import { getAgentById, updateAgent } from "./agents";
import { createLicenseForEvaluation } from "./licenses";

function slugToLicenseType(slug: LicenseClassSlug): LicenseType {
  return LICENSE_CLASS_LABEL[slug] as LicenseType;
}

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Deterministic-ish mock scores from agentId + scenario index */
function mockScenarioScore(agentId: string, index: number, base: number): number {
  const noise = (hashSeed(`${agentId}:${index}`) % 9) - 4;
  return Math.min(99, Math.max(55, base + noise));
}

export function runEvaluation(input: { agentId: string; licenseClass: LicenseClassSlug }): {
  evaluation: Evaluation;
  licenseCreated: boolean;
} | null {
  const agent = getAgentById(input.agentId);
  if (!agent) return null;

  updateAgent(agent.id, { status: "under_review" });

  const repos = getRepositories();
  const id = generateId("evl");
  const lt = slugToLicenseType(input.licenseClass);
  const scenarioTexts = SCENARIOS[lt] ?? SCENARIOS["Sales License"];
  const base = 70 + (hashSeed(input.agentId) % 20);

  const breakdown = scenarioTexts.slice(0, 3).map((text, i) => ({
    scenario: `Scenario ${i + 1}`,
    score: mockScenarioScore(input.agentId, i, base),
  }));

  const avg = breakdown.reduce((s, b) => s + b.score, 0) / breakdown.length;
  const passed = avg >= 72;
  const status = passed ? "passed" : "failed";

  const notes = passed
    ? "Agent handled objections clearly and maintained structure. Suitable for issuance under current policy."
    : "Score below issuance threshold. Review tone consistency and escalation handling before re-submission.";

  const evaluation: Evaluation = {
    id,
    agentId: agent.id,
    licenseClass: input.licenseClass,
    status,
    score: Math.round(avg),
    breakdown,
    notes,
    createdAt: new Date().toISOString(),
  };

  repos.evaluations.save(evaluation);

  updateAgent(agent.id, {
    status: passed ? "passed" : "failed",
    verified: passed,
    licenseClass: input.licenseClass,
  });

  let licenseCreated = false;
  if (passed) {
    createLicenseForEvaluation(evaluation);
    licenseCreated = true;
  }

  return { evaluation, licenseCreated };
}

export function getEvaluationById(id: string): Evaluation | undefined {
  return getRepositories().evaluations.findById(id);
}

export function parseEvaluationBody(body: unknown): { agentId: string; licenseClass: LicenseClassSlug } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const agentId = typeof o.agentId === "string" ? o.agentId : "";
  const lc = typeof o.licenseClass === "string" ? o.licenseClass : "";
  if (!agentId) return null;
  if (!isLicenseClassSlug(lc)) return null;
  return { agentId, licenseClass: lc };
}
