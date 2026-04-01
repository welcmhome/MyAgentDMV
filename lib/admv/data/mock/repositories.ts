/**
 * Mock implementations of AgentRepository, EvaluationRepository, LicenseRepository.
 * Swap: replace createMockRepositories() in ../index.ts with Supabase-backed factories.
 */

import type { Agent, Evaluation, License } from "../../types";
import type { AdmvRepositories, AgentRepository, EvaluationRepository, LicenseRepository } from "../contracts";
import { getMemoryStore } from "./memory-store";

function createAgentRepository(): AgentRepository {
  return {
    save(agent: Agent) {
      getMemoryStore().agentsById.set(agent.id, agent);
    },
    findById(id: string) {
      return getMemoryStore().agentsById.get(id);
    },
    update(id: string, patch: Partial<Agent>) {
      const store = getMemoryStore();
      const cur = store.agentsById.get(id);
      if (!cur) return undefined;
      const next = { ...cur, ...patch };
      store.agentsById.set(id, next);
      return next;
    },
    listAll() {
      return [...getMemoryStore().agentsById.values()];
    },
    count() {
      return getMemoryStore().agentsById.size;
    },
  };
}

function createEvaluationRepository(): EvaluationRepository {
  return {
    save(evaluation: Evaluation) {
      getMemoryStore().evaluationsById.set(evaluation.id, evaluation);
    },
    findById(id: string) {
      return getMemoryStore().evaluationsById.get(id);
    },
    listAll() {
      return [...getMemoryStore().evaluationsById.values()];
    },
  };
}

function createLicenseRepository(): LicenseRepository {
  return {
    save(license: License) {
      const store = getMemoryStore();
      store.licensesById.set(license.id, license);
      store.licenseByAgentId.set(license.agentId, license.id);
    },
    findById(id: string) {
      return getMemoryStore().licensesById.get(id);
    },
    findByAgentId(agentId: string) {
      const store = getMemoryStore();
      const licId = store.licenseByAgentId.get(agentId);
      if (!licId) return undefined;
      return store.licensesById.get(licId);
    },
    findByEvaluationId(evaluationId: string) {
      for (const lic of getMemoryStore().licensesById.values()) {
        if (lic.evaluationId === evaluationId) return lic;
      }
      return undefined;
    },
    listAll() {
      return [...getMemoryStore().licensesById.values()];
    },
  };
}

export function createMockRepositories(): AdmvRepositories {
  return {
    agents: createAgentRepository(),
    evaluations: createEvaluationRepository(),
    licenses: createLicenseRepository(),
  };
}
