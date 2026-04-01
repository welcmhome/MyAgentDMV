import type { Agent, EntrantType, LicenseClassSlug } from "./types";
import { generateAgentNumber, generateId } from "./ids";
import { getRepositories } from "./data";
import { isLicenseClassSlug } from "./license-classes";

export function createAgent(input: {
  name: string;
  entrantType: EntrantType;
  licenseClass: LicenseClassSlug;
}): Agent {
  const repos = getRepositories();
  const id = generateId("agt");
  const agent: Agent = {
    id,
    agentNumber: generateAgentNumber(),
    name: input.name.trim() || "Unnamed Agent",
    entrantType: input.entrantType,
    licenseClass: input.licenseClass,
    status: "pending",
    verified: false,
    createdAt: new Date().toISOString(),
  };
  repos.agents.save(agent);
  return agent;
}

export function getAgentById(id: string): Agent | undefined {
  return getRepositories().agents.findById(id);
}

export function updateAgent(id: string, patch: Partial<Agent>): Agent | undefined {
  return getRepositories().agents.update(id, patch);
}

export function parseCreateAgentBody(body: unknown): { name: string; entrantType: EntrantType; licenseClass: LicenseClassSlug } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name : "";
  const entrantType = o.entrantType === "human" ? "human" : "agent";
  const lc = typeof o.licenseClass === "string" ? o.licenseClass : "";
  if (!isLicenseClassSlug(lc)) return null;
  return { name, entrantType, licenseClass: lc };
}
