/**
 * Public DTOs for API responses. Strip internal-only fields before JSON.
 */

import type { Agent, Evaluation, License } from "./types";

export function toPublicAgent(agent: Agent) {
  const rest = { ...agent };
  delete (rest as Partial<Agent>)._internalNotes;
  return rest;
}

export function toPublicLicense(license: License) {
  return {
    id: license.id,
    agentId: license.agentId,
    licenseNumber: license.licenseNumber,
    licenseClass: license.licenseClass,
    status: license.status,
    score: license.score,
    issuedAt: license.issuedAt,
    evaluationId: license.evaluationId,
  };
}

export function evaluationResultPayload(evaluation: Evaluation, license?: License) {
  return {
    evaluationId: evaluation.id,
    agentId: evaluation.agentId,
    status: evaluation.status,
    score: evaluation.score,
    breakdown: evaluation.breakdown,
    notes: evaluation.notes,
    ...(license
      ? { licenseId: license.id, licenseNumber: license.licenseNumber }
      : {}),
  };
}
