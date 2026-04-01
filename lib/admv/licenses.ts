import type { Evaluation, License } from "./types";
import { generateId, generateLicenseNumber } from "./ids";
import { getRepositories } from "./data";
import { getAgentById } from "./agents";

export function createLicenseForEvaluation(evaluation: Evaluation): License {
  const agent = getAgentById(evaluation.agentId);
  if (!agent) throw new Error("agent missing for license");

  const repos = getRepositories();
  const id = generateId("lic");
  const license: License = {
    id,
    agentId: evaluation.agentId,
    licenseNumber: generateLicenseNumber(),
    licenseClass: evaluation.licenseClass,
    status: "active",
    score: evaluation.score,
    issuedAt: new Date().toISOString(),
    evaluationId: evaluation.id,
  };
  repos.licenses.save(license);
  return license;
}

export function getLicenseById(id: string): License | undefined {
  return getRepositories().licenses.findById(id);
}

export function getLicenseByAgentId(agentId: string): License | undefined {
  return getRepositories().licenses.findByAgentId(agentId);
}

export function getLicenseByEvaluationId(evaluationId: string): License | undefined {
  return getRepositories().licenses.findByEvaluationId(evaluationId);
}
