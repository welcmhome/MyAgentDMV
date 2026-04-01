"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AgentLicenseCard } from "@/components/agent-license-card";
import { messageFromApiError } from "@/lib/admv/api-errors";
import type { EvaluationResultDTO } from "@/lib/admv/evaluation-result";

function formatIssued(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export function ResultsContent() {
  const searchParams = useSearchParams();
  const evaluationId = searchParams.get("evaluationId");

  const [data, setData] = useState<EvaluationResultDTO | null>(null);
  const [loading, setLoading] = useState(!!evaluationId);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/evaluations/${encodeURIComponent(id)}`, { cache: "no-store" });
        const body: unknown = await res.json().catch(() => ({}));
        if (!res.ok) {
          setData(null);
          setError(messageFromApiError(body, res.status === 404 ? "Evaluation not found." : "Could not load results."));
          return;
        }
        setData(body as EvaluationResultDTO);
      } catch {
        setData(null);
        setError("Network error. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!evaluationId) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }
    void load(evaluationId);
  }, [evaluationId, load]);

  if (!evaluationId) {
    return (
      <div className="space-y-6 py-8">
        <section className="section-shell p-6 text-center">
          <p className="font-mono text-xs text-[var(--accent-yellow)]">no evaluation id</p>
          <h1 className="mt-2 text-2xl font-semibold">Results unavailable</h1>
          <p className="mt-2 text-sm text-muted">Complete a driving test at the station to view certification outcome.</p>
          <Link href="/test" className="primary-btn focus-ring mt-6 inline-flex px-4 py-2.5 text-sm">
            go to driving test station
          </Link>
        </section>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-7 py-4 sm:space-y-8">
        <section className="world-grid animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="h-4 w-40 rounded bg-[var(--border)]" />
          <div className="mt-4 h-9 w-2/3 max-w-md rounded bg-[var(--border)]" />
          <div className="mt-2 h-3 w-full max-w-lg rounded bg-[var(--border)]/70" />
        </section>
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="section-shell h-72 animate-pulse rounded-xl bg-[var(--surface-soft)]/50" />
          <div className="module-card h-56 animate-pulse rounded-xl bg-[var(--surface-soft)]/50" />
        </div>
        <p className="text-center font-mono text-xs text-muted">loading evaluation record…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6 py-8">
        <section className="section-shell p-6 text-center">
          <p className="font-mono text-xs text-[var(--accent-red)]">could not load results</p>
          <h1 className="mt-2 text-2xl font-semibold">Evaluation unavailable</h1>
          <p className="mt-2 text-sm text-muted">{error ?? "Something went wrong."}</p>
          <p className="mt-3 text-xs text-muted">
            In this demo, results live in the server session. If you restarted the dev server, run the driving test again.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => evaluationId && void load(evaluationId)}
              className="primary-btn focus-ring px-4 py-2.5 text-sm"
            >
              retry
            </button>
            <Link
              href="/test"
              className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm transition hover:border-[var(--accent)]/45"
            >
              driving test station
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const { evaluation, agent, license, licenseClassLabel, passed, issuanceMissing } = data;
  const agentName = agent?.name ?? "Unknown agent";
  const agentNumber = agent?.agentNumber ?? "—";

  return (
    <div className="space-y-7 py-4 sm:space-y-8">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">certification outcome</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Test Results</h1>
            <p className="mt-2 text-sm text-muted">Loaded from evaluation record · ID {evaluation.id}</p>
          </div>
          <span
            className={`rounded-lg border px-3 py-2 font-mono text-sm ${
              passed && !issuanceMissing
                ? "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent)]"
                : "border-[var(--accent-red)]/35 bg-[var(--accent-red)]/10 text-red-300"
            }`}
          >
            status: {evaluation.status}
            {issuanceMissing ? " · issuance pending" : ""}
          </span>
        </div>
      </section>

      {issuanceMissing ? (
        <section className="rounded-xl border border-[var(--accent-yellow)]/40 bg-[var(--accent-yellow)]/10 px-4 py-3 font-mono text-xs text-[var(--accent-yellow)]">
          Pass recorded, but no license row was found. Refresh or run the driving test again if this persists after a server
          restart.
        </section>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
        <article className="section-shell p-4 sm:p-5">
          {passed && license && !issuanceMissing ? (
            <>
              <AgentLicenseCard
                agentName={agentName}
                licenseClass={licenseClassLabel}
                status="APPROVED"
                licenseId={license.licenseNumber}
                issuedDate={formatIssued(license.issuedAt)}
                size="lg"
                validated
                glow
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <ResultField label="agent number" value={agentNumber} emphasized />
                <ResultField label="score" value={`${evaluation.score}`} />
                <ResultField label="license record id" value={license.id} />
                <ResultField label="verification" value={agent?.verified ? "Verified" : "Pending"} />
              </div>
            </>
          ) : !passed ? (
            <div className="relative overflow-hidden rounded-xl border-2 border-[var(--accent-red)]/50 bg-gradient-to-br from-[#1a0a0a] to-[#0f0f0f] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(239,68,68,0.03)_2px,rgba(239,68,68,0.03)_4px)]" />
              <p className="font-mono text-xs tracking-[0.2em] text-red-300/90">inspection failed</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">No license issued</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Score {evaluation.score} is below the issuance threshold. The agent remains unlicensed until remediated
                and re-evaluated.
              </p>
              <div className="mt-6 grid gap-3 border-t border-red-900/40 pt-4 sm:grid-cols-2">
                <ResultField label="agent" value={agentName} />
                <ResultField label="agent number" value={agentNumber} />
                <ResultField label="class" value={licenseClassLabel} />
                <ResultField label="score" value={`${evaluation.score}`} />
              </div>
            </div>
          ) : (
            <div className="module-card rounded-xl border border-[var(--border)] p-6 text-sm text-muted">
              Issuance data is still resolving. Use retry or return to the driving test station.
            </div>
          )}
        </article>

        <article className="module-card normal-case rounded-xl p-5">
          <h2 className="text-xl font-semibold tracking-tight">Route summary</h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs font-mono sm:grid-cols-2">
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">route: {licenseClassLabel}</span>
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">
              scenarios: {evaluation.breakdown.length}
            </span>
            <span className="rounded-md border border-[var(--border)] bg-black/30 px-2 py-1">evaluation: complete</span>
            <span
              className={`rounded-md border px-2 py-1 ${
                passed && !issuanceMissing
                  ? "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--accent-red)]/35 bg-[var(--accent-red)]/10 text-red-300"
              }`}
            >
              {passed && !issuanceMissing ? "license issued" : "license withheld"}
            </span>
          </div>
          <p className="mt-4 text-sm text-muted">{evaluation.notes}</p>
        </article>
      </section>

      <section className="section-shell p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">Road test breakdown</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {evaluation.breakdown.map((row, index) => (
            <article key={`${row.scenario}-${index}`} className="module-card normal-case rounded-xl p-4">
              <p className="font-mono text-xs text-muted">{row.scenario}</p>
              <p className="mt-3 text-2xl font-semibold text-[var(--accent)]">{row.score}</p>
              <p className="mt-2 font-mono text-[11px] text-muted">weighted lane score</p>
            </article>
          ))}
        </div>
        <article className="module-card mt-3 rounded-xl p-4">
          <p className="font-mono text-xs text-muted">evaluator notes</p>
          <p className="mt-1 text-sm leading-6 text-muted">{evaluation.notes}</p>
        </article>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href="/test" className="primary-btn focus-ring w-full px-4 py-2.5 text-center text-sm sm:w-auto">
          run another driving test
        </Link>
        <Link
          href="/licenses"
          className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-center text-sm font-medium transition hover:border-[var(--accent)]/45 hover:bg-black/25 sm:w-auto"
        >
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
