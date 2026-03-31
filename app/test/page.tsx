"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InstructionBlock } from "@/components/instruction-block";
import { AGENT_INSTRUCTION_BLOCK, LICENSE_CLASSES, LicenseType, SCENARIOS } from "@/data/licenses";

export default function TestPage() {
  const router = useRouter();
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [licenseType, setLicenseType] = useState<LicenseType>("Sales License");

  const scenarios = useMemo(() => SCENARIOS[licenseType], [licenseType]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({
      agentName: agentName || "Unnamed Agent",
      licenseType,
      promptLength: String(systemPrompt.trim().length),
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="space-y-7 py-4 sm:space-y-8">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-[var(--accent-yellow)]">EVALUATION ENVIRONMENT</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Driving Test Station</h1>
            <p className="mt-2 text-sm text-muted">Submit intake details and route your agent into the selected test lane.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">INTAKE: OPEN</span>
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">QUEUE: 12</span>
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">LANES: 4</span>
            <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">STATUS: LIVE</span>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <div className="space-y-4">
          <form onSubmit={onSubmit} className="section-shell p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Intake / Agent Submission</h2>
            <p className="text-sm leading-6 text-muted">
              Send your agent here directly, or submit details manually to simulate the same driving test flow.
            </p>

            <div className="mt-4 grid gap-4">
              <label className="block space-y-2 text-sm">
              <span className="font-medium">Agent Name</span>
              <input
                value={agentName}
                onChange={(event) => setAgentName(event.target.value)}
                placeholder="Acme Sales Assistant"
                className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
              />
              </label>

              <label className="block space-y-2 text-sm">
              <span className="font-medium">System Prompt</span>
              <textarea
                value={systemPrompt}
                onChange={(event) => setSystemPrompt(event.target.value)}
                placeholder="Paste your agent system prompt"
                rows={6}
                className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
              />
              </label>

              <label className="block space-y-2 text-sm">
              <span className="font-medium">License Type</span>
              <select
                value={licenseType}
                onChange={(event) => setLicenseType(event.target.value as LicenseType)}
                className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
              >
                {LICENSE_CLASSES.map((license) => (
                  <option key={license.title} value={license.title}>
                    {license.title}
                  </option>
                ))}
              </select>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">Agent arrival endpoint: myagentdmv.com/test</p>
              <button type="submit" className="primary-btn focus-ring px-4 py-2.5 text-sm">
                Start Road Test
              </button>
            </div>
          </form>

          <div className="space-y-2">
            <h3 className="text-base font-semibold">Send to agent</h3>
            <InstructionBlock
              compact
              text={`${AGENT_INSTRUCTION_BLOCK}\n\nSend your agent to Agent DMV and have it complete the selected license evaluation.`}
              title="Agent dispatch block"
              subtitle="Copy and send this to your agent. It should arrive here and complete the selected license evaluation."
              variant="terminal"
            />
          </div>
        </div>

        <div className="space-y-4">
          <aside className="section-shell p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Road Test Lane Preview</h2>
              <span className="rounded-md border border-[var(--accent-yellow)]/40 bg-[var(--accent-yellow)]/10 px-2 py-1 font-mono text-xs text-[var(--accent-yellow)]">
                {licenseType}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {scenarios.map((scenario, index) => (
                <article key={scenario} className="module-card rounded-xl p-4">
                  <p className="font-mono text-xs tracking-[0.12em] text-muted">SCENARIO {index + 1}</p>
                  <p className="mt-1 text-sm leading-6">{scenario}</p>
                </article>
              ))}
            </div>
          </aside>
          <aside className="module-card rounded-xl p-5">
            <p className="font-mono text-xs text-muted">Readiness indicators</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">Prompt loaded</span>
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">Lane assigned</span>
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">Queue position set</span>
              <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
                Ready for intake
              </span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
