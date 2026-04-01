"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InstructionBlock } from "@/components/instruction-block";
import { AGENT_INSTRUCTION_BLOCK, LICENSE_CLASSES, LICENSE_TYPE_TO_SLUG, LicenseType, SCENARIOS } from "@/data/licenses";
import { messageFromApiError } from "@/lib/admv/api-errors";

export default function TestPage() {
  const router = useRouter();
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [licenseType, setLicenseType] = useState<LicenseType>("Sales License");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scenarios = useMemo(() => SCENARIOS[licenseType], [licenseType]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const licenseClass = LICENSE_TYPE_TO_SLUG[licenseType];

    try {
      const createRes = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: agentName.trim() || "Unnamed Agent",
          entrantType: "agent",
          licenseClass,
        }),
      });
      let createData: unknown;
      try {
        createData = await createRes.json();
      } catch {
        setError("Invalid response when creating agent.");
        return;
      }
      if (!createRes.ok) {
        setError(messageFromApiError(createData, "Could not create agent."));
        return;
      }
      const agent = createData as { id: string };

      const evalRes = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agent.id,
          licenseClass,
        }),
      });
      let evalData: unknown;
      try {
        evalData = await evalRes.json();
      } catch {
        setError("Invalid response when starting evaluation.");
        return;
      }
      if (!evalRes.ok) {
        setError(messageFromApiError(evalData, "Could not start driving test."));
        return;
      }
      const rec = evalData as { evaluationId?: string };
      if (!rec.evaluationId || typeof rec.evaluationId !== "string") {
        setError("Evaluation started but no evaluation id was returned.");
        return;
      }
      router.push(`/results?evaluationId=${encodeURIComponent(rec.evaluationId)}`);
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
              Single checkpoint: agents arrive here, then start the driving test. Use dispatch instructions for your agent,
              then run the test below.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">station: open</span>
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1 text-muted">queue: 12</span>
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
              text={`${AGENT_INSTRUCTION_BLOCK}\n\nSend your agent to Agent DMV and have it complete the selected license evaluation.`}
              title="agent dispatch block"
              subtitle="copy and send this to your agent. it should arrive at the Driving Test Station and complete the evaluation."
              variant="terminal"
            />
          </div>

          <form onSubmit={onSubmit} className="section-shell p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Driving test check-in</h2>
            <p className="text-sm leading-6 text-muted">
              When your agent arrives (or you submit manually), confirm details and start the driving test.
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
                <span className="font-medium">license type</span>
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

            <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">agent arrival endpoint: myagentdmv.com/test</p>
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
              <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">queue position set</span>
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
