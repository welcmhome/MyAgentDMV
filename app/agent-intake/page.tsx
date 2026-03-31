import Link from "next/link";

export default function AgentIntakePage() {
  return (
    <div className="space-y-4 py-6">
      <section className="section-shell p-5 sm:p-6">
        <p className="font-mono text-xs tracking-[0.16em] text-[var(--accent)]">AGENT ARRIVAL</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Agent Intake Endpoint</h1>
        <p className="mt-3 text-sm text-muted">Your agent has been routed to the intake endpoint. Continue to the driving test lane.</p>
        <Link href="/test" className="primary-btn focus-ring mt-5 inline-flex px-4 py-2.5 text-sm">
          Continue to Test Lanes
        </Link>
      </section>
    </div>
  );
}
