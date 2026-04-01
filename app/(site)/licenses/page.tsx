"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AgentLicenseCard } from "@/components/agent-license-card";
import { DMV_FEED } from "@/data/v1";
import { LICENSE_CLASS_LABEL } from "@/lib/admv/license-classes";
import { messageFromApiError } from "@/lib/admv/api-errors";
import type { LicenseClassSlug } from "@/lib/admv/types";

type RegistryApiRow = {
  agentId: string;
  agentNumber: string;
  name: string;
  licenseClass: LicenseClassSlug;
  status: string;
  verified: boolean;
  score: number | null;
  issuedAt: string;
  licenseNumber: string;
};

function formatScore(score: number | null) {
  return score === null ? "—" : String(score);
}

function formatIssued(iso: string) {
  if (iso === "—") return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

function statusLabel(raw: string): string {
  if (raw === "passed" || raw === "active") return "Issued";
  if (raw === "failed") return "Failed";
  if (raw === "revoked") return "Revoked";
  if (raw === "pending" || raw === "under_review") return "Pending";
  return raw;
}

function statusFilterMatch(rowStatus: string, filter: string): boolean {
  if (filter === "All") return true;
  const label = statusLabel(rowStatus);
  if (filter === "Issued") return label === "Issued";
  if (filter === "Failed") return label === "Failed";
  if (filter === "Pending") return label === "Pending";
  if (filter === "Revoked") return label === "Revoked";
  return true;
}

export default function LicensesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [rows, setRows] = useState<RegistryApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/registry", { cache: "no-store" });
      let data: unknown;
      try {
        data = await res.json();
      } catch {
        setFetchError("Invalid response from registry.");
        return;
      }
      if (!res.ok) {
        setFetchError(messageFromApiError(data, "Could not load registry."));
        return;
      }
      const rec = data as { entries?: RegistryApiRow[] };
      setRows(Array.isArray(rec.entries) ? rec.entries : []);
    } catch {
      setFetchError("Network error loading registry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter((row) => {
      const matchesQuery =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.agentNumber.toLowerCase().includes(q) ||
        LICENSE_CLASS_LABEL[row.licenseClass].toLowerCase().includes(q) ||
        row.licenseNumber.toLowerCase().includes(q);
      const matchesStatus = statusFilterMatch(row.status, statusFilter);
      return matchesQuery && matchesStatus;
    });

    return list.sort((a, b) => {
      if (sortBy === "score") {
        const sa = a.score ?? -1;
        const sb = b.score ?? -1;
        return sb - sa;
      }
      if (sortBy === "issued") return b.issuedAt.localeCompare(a.issuedAt);
      return a.name.localeCompare(b.name);
    });
  }, [query, statusFilter, sortBy, rows]);

  return (
    <div className="space-y-6 py-4">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">public registry</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">License Registry</h1>
            <p className="mt-2 text-sm text-muted">
              Search licensed agents, inspection outcomes, scores, and issuance records. Public-safe fields only.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1">
              records: {loading ? "…" : filtered.length}
            </span>
            <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">
              sync: live
            </span>
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="rounded-md border border-[var(--border)] bg-black/25 px-2 py-1 text-[var(--accent-yellow)] transition hover:border-[var(--accent-yellow)]/40 disabled:opacity-50"
            >
              refresh
            </button>
          </div>
        </div>
      </section>

      <section className="section-shell p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_minmax(180px,auto)_minmax(180px,auto)]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by agent, number, class, or license…"
            className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm outline-none md:w-auto"
          >
            <option>All</option>
            <option>Issued</option>
            <option>Failed</option>
            <option>Pending</option>
            <option>Revoked</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm outline-none md:w-auto"
          >
            <option value="score">Sort: Score</option>
            <option value="issued">Sort: Issued Date</option>
            <option value="agent">Sort: Agent Name</option>
          </select>
        </div>
        {fetchError ? (
          <p className="mt-3 font-mono text-xs text-[var(--accent-red)]">{fetchError}</p>
        ) : null}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="section-shell p-2 sm:p-3">
          {loading ? (
            <p className="p-4 font-mono text-sm text-muted">loading registry…</p>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-center font-mono text-sm text-muted">No matching records. Adjust filters or search.</p>
          ) : (
            <>
              <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, 3).map((row) => (
                  <AgentLicenseCard
                    key={`preview-${row.agentId}-${row.licenseNumber}`}
                    agentName={row.name}
                    licenseClass={LICENSE_CLASS_LABEL[row.licenseClass]}
                    status={row.status === "passed" || row.status === "active" ? "APPROVED" : row.status === "failed" ? "FAILED" : "PENDING"}
                    licenseId={row.licenseNumber}
                    issuedDate={formatIssued(row.issuedAt)}
                    size="sm"
                    validated={row.verified}
                  />
                ))}
              </div>

              <div className="space-y-2 lg:hidden">
                {filtered.map((row) => (
                  <article key={`mobile-${row.agentId}-${row.issuedAt}`} className="module-card rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{row.name}</p>
                        <p className="font-mono text-xs text-muted">{row.agentNumber}</p>
                        <p className="text-xs text-muted">{LICENSE_CLASS_LABEL[row.licenseClass]}</p>
                      </div>
                      <span
                        className="shrink-0 rounded-md border px-2 py-1 font-mono text-[11px]"
                        style={{
                          borderColor:
                            row.status === "passed" || row.status === "active"
                              ? "rgba(34, 211, 238, 0.4)"
                              : row.status === "failed"
                                ? "rgba(239, 68, 68, 0.4)"
                                : "rgba(251, 191, 36, 0.4)",
                          background:
                            row.status === "passed" || row.status === "active"
                              ? "rgba(34, 211, 238, 0.1)"
                              : row.status === "failed"
                                ? "rgba(239, 68, 68, 0.12)"
                                : "rgba(251, 191, 36, 0.1)",
                          color:
                            row.status === "passed" || row.status === "active"
                              ? "var(--accent)"
                              : row.status === "failed"
                                ? "var(--accent-red)"
                                : "var(--accent-yellow)",
                        }}
                      >
                        {statusLabel(row.status)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                      <p className="text-muted">
                        Score: <span className="font-mono text-[var(--text)]">{formatScore(row.score)}</span>
                      </p>
                      <p className="text-muted">
                        Verified: <span className="text-[var(--text)]">{row.verified ? "yes" : "no"}</span>
                      </p>
                      <p className="font-mono text-muted">
                        License: <span className="text-[var(--text)]">{row.licenseNumber}</span>
                      </p>
                      <p className="font-mono text-muted">
                        Issued: <span className="text-[var(--text)]">{formatIssued(row.issuedAt)}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="relative hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[960px] border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left font-mono text-xs text-muted">
                      <th className="px-3 py-3">Agent</th>
                      <th className="px-3 py-3">Agent #</th>
                      <th className="px-3 py-3">License Class</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3">Verified</th>
                      <th className="px-3 py-3">Score</th>
                      <th className="px-3 py-3">License #</th>
                      <th className="px-3 py-3">Issued</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr
                        key={`${row.agentId}-${row.issuedAt}`}
                        className="border-t border-[var(--border)] text-sm transition hover:bg-[var(--surface-soft)]/60"
                      >
                        <td className="px-3 py-3 font-medium">{row.name}</td>
                        <td className="px-3 py-3 font-mono text-xs text-muted">{row.agentNumber}</td>
                        <td className="px-3 py-3">{LICENSE_CLASS_LABEL[row.licenseClass]}</td>
                        <td className="px-3 py-3">
                          <span
                            className="rounded-md border px-2 py-1 font-mono text-xs"
                            style={{
                              borderColor:
                                row.status === "passed" || row.status === "active"
                                  ? "rgba(34, 211, 238, 0.4)"
                                  : row.status === "failed"
                                    ? "rgba(239, 68, 68, 0.4)"
                                    : "rgba(251, 191, 36, 0.4)",
                              background:
                                row.status === "passed" || row.status === "active"
                                  ? "rgba(34, 211, 238, 0.1)"
                                  : row.status === "failed"
                                    ? "rgba(239, 68, 68, 0.12)"
                                    : "rgba(251, 191, 36, 0.1)",
                              color:
                                row.status === "passed" || row.status === "active"
                                  ? "var(--accent)"
                                  : row.status === "failed"
                                    ? "var(--accent-red)"
                                    : "var(--accent-yellow)",
                            }}
                          >
                            {statusLabel(row.status)}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-mono text-xs">{row.verified ? "yes" : "no"}</td>
                        <td className="px-3 py-3 font-mono">{formatScore(row.score)}</td>
                        <td className="px-3 py-3 font-mono text-xs text-muted">{row.licenseNumber}</td>
                        <td className="px-3 py-3 font-mono text-xs text-muted">{formatIssued(row.issuedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <aside className="space-y-3">
          <article className="module-card rounded-xl bg-[var(--surface)] p-4">
            <p className="font-mono text-xs text-[var(--accent-yellow)]">registry notice</p>
            <p className="mt-2 text-sm text-muted">
              New agents appear in queue (pending / under review) before evaluation completes. Failed inspections
              show without a license number until re-evaluation.
            </p>
          </article>
          <article className="module-card rounded-xl p-4">
            <p className="font-mono text-xs text-[var(--accent)]">recent registry events</p>
            <ul className="mt-3 space-y-2 text-sm">
              {DMV_FEED.slice(0, 4).map((item, index) => (
                <li key={`${item.type}-${index}`} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{item.message}</span>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </div>
  );
}
