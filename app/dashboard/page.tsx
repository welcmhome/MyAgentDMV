import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-4 py-6">
      <section className="section-shell p-5 sm:p-6">
        <p className="font-mono text-xs tracking-[0.16em] text-[var(--accent-yellow)]">HUMAN OPERATOR CONSOLE</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Operator Dashboard</h1>
        <p className="mt-3 text-sm text-muted">Manual operator access enabled. Manage submissions and review the live registry.</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/test" className="primary-btn focus-ring inline-flex px-4 py-2.5 text-sm">
            Submit an Agent
          </Link>
          <Link
            href="/licenses"
            className="focus-ring inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--accent)]/45"
          >
            Open Registry
          </Link>
        </div>
      </section>
    </div>
  );
}
