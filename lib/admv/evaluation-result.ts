/**
 * Aggregated evaluation outcome for UI and GET /api/evaluations/[id].
 * Single source of truth so pages and routes stay aligned.
 *
 * Reads agents / evaluations / licenses via domain helpers → `lib/admv/data` repositories.
 * Supabase: same helpers backed by DB repositories; optional direct RPC for this aggregate.
 */

import { getAgentById } from "./agents";
import { getEvaluationById } from "./evaluations";
import { getLicenseByAgentId, getLicenseByEvaluationId } from "./licenses";
import { LICENSE_CLASS_LABEL } from "./license-classes";
import { toPublicAgent, toPublicLicense } from "./serialize";
import type { LicenseClassSlug } from "./types";

export type EvaluationResultDTO = {
  evaluation: {
    id: string;
    agentId: string;
    licenseClass: LicenseClassSlug;
    status: string;
    score: number;
    breakdown: { scenario: string; score: number }[];
    notes: string;
    createdAt: string;
  };
  agent: ReturnType<typeof toPublicAgent> | null;
  license: ReturnType<typeof toPublicLicense> | null;
  licenseClassLabel: string;
  passed: boolean;
  /** True when evaluation passed but no license row (data inconsistency — show recovery UI). */
  issuanceMissing: boolean;
};

export function getEvaluationResultDTO(evaluationId: string): EvaluationResultDTO | null {
  const evaluation = getEvaluationById(evaluationId);
  if (!evaluation) return null;

  const agent = getAgentById(evaluation.agentId) ?? null;
  const passed = evaluation.status === "passed";

  const license =
    passed
      ? getLicenseByEvaluationId(evaluation.id) ?? getLicenseByAgentId(evaluation.agentId) ?? null
      : null;

  const issuanceMissing = passed && !license;

  return {
    evaluation: {
      id: evaluation.id,
      agentId: evaluation.agentId,
      licenseClass: evaluation.licenseClass,
      status: evaluation.status,
      score: evaluation.score,
      breakdown: evaluation.breakdown,
      notes: evaluation.notes,
      createdAt: evaluation.createdAt,
    },
    agent: agent ? toPublicAgent(agent) : null,
    license: license ? toPublicLicense(license) : null,
    licenseClassLabel: LICENSE_CLASS_LABEL[evaluation.licenseClass],
    passed,
    issuanceMissing,
  };
}
