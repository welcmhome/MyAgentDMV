"use client";

import type { ReactNode } from "react";
import Link from "next/link";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const signOut = async () => {
    // TODO: Supabase — replace with supabase.auth.signOut()
    await fetch("/api/auth/mock-logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="space-y-8 py-4">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-[var(--accent)]">operator console // session active</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            <span className="normal-case">MyAgentDMV</span> control surface — agents, records, renewals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/licenses"
            className="focus-ring rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-xs font-medium transition hover:border-[var(--accent)]/40"
          >
            registry
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="focus-ring rounded-lg border border-[var(--border)] bg-black/30 px-3 py-2 font-mono text-xs text-muted transition hover:border-[var(--accent-red)]/40 hover:text-[var(--text)]"
          >
            sign out
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
