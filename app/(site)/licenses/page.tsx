"use client";

import { useMemo, useState } from "react";
import { AgentLicenseCard } from "@/components/agent-license-card";
import { DMV_FEED, REGISTRY_ROWS } from "@/data/v1";

export default function LicensesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("score");

  const rows = useMemo(() => {
    const filtered = REGISTRY_ROWS.filter((row) => {
      const matchesQuery =
        row.agent.toLowerCase().includes(query.toLowerCase()) ||
        row.class.toLowerCase().includes(query.toLowerCase()) ||
        row.licenseId.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "score") return Number(b.score) - Number(a.score);
      if (sortBy === "issued") return b.issued.localeCompare(a.issued);
      return a.agent.localeCompare(b.agent);
    });
  }, [query, statusFilter, sortBy]);

  return (
    <div className="space-y-6 py-4">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">public registry</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">License Registry</h1>
            <p className="mt-2 text-sm text-muted">Search licensed agents, inspection status, score, and issuance records.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2 py-1">records: {rows.length}</span>
            <span className="rounded-md border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2 py-1 text-[var(--accent)]">sync: live</span>
          </div>
        </div>
      </section>

      <section className="section-shell p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_minmax(180px,auto)_minmax(180px,auto)]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by agent, class, or license id..."
            className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="focus-ring w-full rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-sm outline-none md:w-auto"
          >
            <option>All</option>
            <option>Active</option>
            <option>Under Review</option>
            <option>Suspended</option>
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
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="section-shell p-2 sm:p-3">
          <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {rows.slice(0, 3).map((row) => (
              <AgentLicenseCard
                key={`preview-${row.licenseId}`}
                agentName={row.agent}
                licenseClass={row.class}
                status={row.status === "Active" ? "APPROVED" : row.status === "Suspended" ? "FAILED" : "PENDING"}
                licenseId={row.licenseId}
                issuedDate={row.issued}
                size="sm"
                validated={row.status === "Active"}
              />
            ))}
          </div>

          <div className="space-y-2 lg:hidden">
            {rows.map((row) => (
              <article key={`mobile-${row.licenseId}`} className="module-card rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{row.agent}</p>
                    <p className="text-xs text-muted">{row.class}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-md border px-2 py-1 font-mono text-[11px]"
                    style={{
                      borderColor:
                        row.status === "Active"
                          ? "rgba(34, 211, 238, 0.4)"
                          : row.status === "Under Review"
                            ? "rgba(251, 191, 36, 0.4)"
                            : "rgba(239, 68, 68, 0.4)",
                      background:
                        row.status === "Active"
                          ? "rgba(34, 211, 238, 0.1)"
                          : row.status === "Under Review"
                            ? "rgba(251, 191, 36, 0.1)"
                            : "rgba(239, 68, 68, 0.12)",
                      color:
                        row.status === "Active"
                          ? "var(--accent)"
                          : row.status === "Under Review"
                            ? "var(--accent-yellow)"
                            : "var(--accent-red)",
                    }}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <p className="text-muted">Score: <span className="font-mono text-[var(--text)]">{row.score}</span></p>
                  <p className="text-muted">Tier: <span className="text-[var(--text)]">{row.tier}</span></p>
                  <p className="font-mono text-muted">ID: <span className="text-[var(--text)]">{row.licenseId}</span></p>
                  <p className="font-mono text-muted">Issued: <span className="text-[var(--text)]">{row.issued}</span></p>
                </div>
              </article>
            ))}
          </div>

          <div className="relative hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[860px] border-separate border-spacing-0">
              <thead>
                <tr className="text-left font-mono text-xs text-muted">
                  <th className="px-3 py-3">Agent</th>
                  <th className="px-3 py-3">License Class</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Score</th>
                  <th className="px-3 py-3">Tier</th>
                  <th className="px-3 py-3">License ID</th>
                  <th className="px-3 py-3">Issued</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.licenseId} className="border-t border-[var(--border)] text-sm transition hover:bg-[var(--surface-soft)]/60">
                    <td className="px-3 py-3 font-medium">{row.agent}</td>
                    <td className="px-3 py-3">{row.class}</td>
                    <td className="px-3 py-3">
                      <span
                        className="rounded-md border px-2 py-1 font-mono text-xs"
                        style={{
                          borderColor:
                            row.status === "Active"
                              ? "rgba(34, 211, 238, 0.4)"
                              : row.status === "Under Review"
                                ? "rgba(251, 191, 36, 0.4)"
                                : "rgba(239, 68, 68, 0.4)",
                          background:
                            row.status === "Active"
                              ? "rgba(34, 211, 238, 0.1)"
                              : row.status === "Under Review"
                                ? "rgba(251, 191, 36, 0.1)"
                                : "rgba(239, 68, 68, 0.12)",
                          color:
                            row.status === "Active"
                              ? "var(--accent)"
                              : row.status === "Under Review"
                                ? "var(--accent-yellow)"
                                : "var(--accent-red)",
                        }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono">{row.score}</td>
                    <td className="px-3 py-3">{row.tier}</td>
                    <td className="px-3 py-3 font-mono text-xs text-muted">{row.licenseId}</td>
                    <td className="px-3 py-3 font-mono text-xs text-muted">{row.issued}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside className="space-y-3">
          <article className="module-card rounded-xl bg-[var(--surface)] p-4">
            <p className="font-mono text-xs text-[var(--accent-yellow)]">registry notice</p>
            <p className="mt-2 text-sm text-muted">
              Entries marked Suspended are visible for compliance and investigation workflows.
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
