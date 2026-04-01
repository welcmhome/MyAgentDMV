import type { ReactNode } from "react";
import Link from "next/link";
import { AgentLicenseCard } from "@/components/agent-license-card";
import { LicenseType, SCENARIOS } from "@/data/licenses";

const BREAKDOWN = [8.4, 8.8, 8.7];

type ResultsPageProps = {
  searchParams: Promise<{
    agentName?: string;
    licenseType?: LicenseType;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const agentName = params.agentName || "Unnamed Agent";
  const licenseType = params.licenseType || "Sales License";
  const scenarios = SCENARIOS[licenseType] ?? SCENARIOS["Sales License"];
  const status = "passed";

  return (
    <div className="space-y-7 py-4 sm:space-y-8">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">certification outcome</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Test Results</h1>
            <p className="mt-2 text-sm text-muted">licensing authority decision for submitted agent.</p>
          </div>
          <span className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-2 font-mono text-sm text-[var(--accent)]">
            status: {status}
          </span>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
        <article className="section-shell p-4 sm:p-5">
          <AgentLicenseCard
            agentName={agentName}
            licenseClass={licenseType}
            status="APPROVED"
            licenseId="ADMV-2026-000847"
            issuedDate="2026-03-31"
            size="lg"
            validated
            glow
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ResultField label="tier" value="Gold" />
            <ResultField label="score" value="8.6" />
            <ResultField label="issued by" value={<span className="normal-case">Agent DMV</span>} />
            <ResultField label="verification" value="Available" />
          </div>
        </article>

        <article className="module-card normal-case rounded-xl p-5">
          <h2 className="text-xl font-semibold tracking-tight">Route summary</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-mono sm:grid-cols-2">
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">route: {licenseType}</span>
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">scenarios: 3</span>
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">evaluation: complete</span>
            <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
              license issued
            </span>
          </div>
          <p className="mt-4 text-sm text-muted">
            agent demonstrated stable response quality and passed required threshold for license issuance.
          </p>
        </article>
      </section>

      <section className="section-shell p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">Road Test Breakdown</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {BREAKDOWN.map((score, index) => (
            <article key={`scenario-${score}-${index}`} className="module-card normal-case rounded-xl p-4">
              <p className="font-mono text-xs text-muted">scenario {index + 1}</p>
              <p className="mt-1 text-sm leading-6">{scenarios[index]}</p>
              <p className="mt-3 text-sm font-semibold">score: {score}</p>
            </article>
          ))}
        </div>
        <article className="module-card mt-3 rounded-xl p-4">
          <p className="font-mono text-xs text-muted">evaluator notes</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            clear intent handling, strong response structure, and consistent tone under pressure. minor opportunity to
            tighten objection handling and include sharper next-step calls to action.
          </p>
        </article>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href="/test" className="primary-btn focus-ring w-full px-4 py-2.5 text-center text-sm sm:w-auto">
          run another test
        </Link>
        <button type="button" className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--accent-yellow)]/45 hover:bg-black/25 sm:w-auto">
          download license
        </button>
        <Link href="/licenses" className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-center text-sm font-medium transition hover:border-[var(--accent)]/45 hover:bg-black/25 sm:w-auto">
          open registry
        </Link>
      </section>
    </div>
  );
}

function ResultField({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <div className="module-card normal-case rounded-lg p-4">
      <p className="font-mono text-xs tracking-wide text-muted lowercase">{label}</p>
      <p className={`mt-1 text-base ${emphasized ? "font-semibold text-[var(--accent-yellow)]" : "font-medium"}`}>{value}</p>
    </div>
  );
}
