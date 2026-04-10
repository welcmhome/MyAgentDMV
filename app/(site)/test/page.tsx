"use client";

import { useMemo, useState } from "react";
import { InstructionBlock } from "@/components/instruction-block";
import { AGENT_INSTRUCTION_BLOCK, LICENSE_CLASSES, LICENSE_TYPE_TO_SLUG, LicenseType, SCENARIOS } from "@/data/licenses";
import { messageFromApiError } from "@/lib/admv/api-errors";

type RegisterSuccessBody = {
  success: true;
  agent_id: string;
  claim_token: string;
  claim_code: string;
};

export default function TestPage() {
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [licenseType, setLicenseType] = useState<LicenseType>("Sales License");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registerResult, setRegisterResult] = useState<RegisterSuccessBody | null>(null);

  const scenarios = useMemo(() => SCENARIOS[licenseType], [licenseType]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setRegisterResult(null);
    setSubmitting(true);

    const agent_name = agentName.trim() || "Unnamed Agent";
    const platform = "custom";
    const agent_type = LICENSE_TYPE_TO_SLUG[licenseType];

    try {
      const res = await fetch("/api/agents/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_name,
          platform,
          agent_type,
        }),
      });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        setError("Invalid response when registering agent.");
        return;
      }
      if (!res.ok) {
        setError(messageFromApiError(data, "Could not register agent."));
        return;
      }
      const body = data as Partial<RegisterSuccessBody>;
      if (
        body.success !== true ||
        typeof body.agent_id !== "string" ||
        typeof body.claim_code !== "string" ||
        typeof body.claim_token !== "string"
      ) {
        setError("Registration succeeded but the response was incomplete.");
        return;
      }
      setRegisterResult({
        success: true,
        agent_id: body.agent_id,
        claim_token: body.claim_token,
        claim_code: body.claim_code,
      });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-7 py-4 sm:space-y-8">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">evaluation environment</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Driving Test Station</h1>
            <p className="mt-2 text-sm text-muted">
              Check-in issues an Agent ID, then you run a lane certification. Use dispatch instructions for remote agents, then
              start the test below—each lane can earn a separate License ID.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">station: open</span>
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">intake: live</span>
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">lanes: 4</span>
            <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">status: live</span>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold">Send to agent</h3>
            <InstructionBlock
              compact
              text={`${AGENT_INSTRUCTION_BLOCK}\n\nSend your agent to Agent DMV and have it complete the selected lane certification.`}
              title="agent dispatch block"
              subtitle="copy and send this to your agent. it should arrive at the Driving Test Station and complete the lane evaluation."
              variant="terminal"
            />
          </div>

          <form onSubmit={onSubmit} className="section-shell p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Driving test check-in</h2>
            <p className="text-sm leading-6 text-muted">
              Submitting creates or binds an Agent ID, then starts certification for the selected lane. Re-run for additional
              License IDs on other lanes.
            </p>

            <div className="mt-4 grid gap-4">
              <label className="block space-y-2 text-sm">
                <span className="font-medium">agent name</span>
                <input
                  value={agentName}
                  onChange={(event) => setAgentName(event.target.value)}
                  placeholder="Acme Sales Assistant"
                  className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
                  disabled={submitting}
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">system prompt</span>
                <textarea
                  value={systemPrompt}
                  onChange={(event) => setSystemPrompt(event.target.value)}
                  placeholder="Paste your agent system prompt"
                  rows={6}
                  className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
                  disabled={submitting}
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">certification lane (license class)</span>
                <select
                  value={licenseType}
                  onChange={(event) => setLicenseType(event.target.value as LicenseType)}
                  className="focus-ring w-full rounded-lg border px-3 py-2 outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--surface-soft)" }}
                  disabled={submitting}
                >
                  {LICENSE_CLASSES.map((license) => (
                    <option key={license.title} value={license.title}>
                      {license.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error ? (
              <p className="mt-4 rounded-md border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-3 py-2 font-mono text-xs text-red-300">
                {error}
              </p>
            ) : null}

            {registerResult ? (
              <div className="mt-4 space-y-2 rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm">
                <p className="font-mono text-xs text-muted">registration issued</p>
                <p>
                  <span className="text-muted">agent_id</span>{" "}
                  <span className="font-mono text-[var(--accent)]">{registerResult.agent_id}</span>
                </p>
                <p>
                  <span className="text-muted">claim_code</span>{" "}
                  <span className="font-mono text-[var(--accent-yellow)]">{registerResult.claim_code}</span>
                </p>
              </div>
            ) : null}

            <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">station endpoint (Agent ID issued on check-in): myagentdmv.com/test</p>
              <button type="submit" disabled={submitting} className="primary-btn focus-ring w-full px-4 py-2.5 text-sm sm:w-auto disabled:opacity-60">
                {submitting ? "starting…" : "Start Driving Test"}
              </button>
            </div>
          </form>
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
                <article key={scenario} className="module-card normal-case rounded-xl p-4">
                  <p className="font-mono text-xs tracking-[0.08em] text-muted">scenario {index + 1}</p>
                  <p className="mt-1 text-sm leading-6">{scenario}</p>
                </article>
              ))}
            </div>
          </aside>
          <aside className="module-card rounded-xl p-5">
            <p className="font-mono text-xs text-muted">readiness indicators</p>
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">prompt loaded</span>
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">lane assigned</span>
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">session bound</span>
              <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
                ready for driving test
              </span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
