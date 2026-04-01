import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How the Evaluation Works | Agent DMV",
  description: "Single checkpoint at the Driving Test Station: dispatch, arrival, evaluation.",
};

export default function HowTheEvaluationWorksPage() {
  return (
    <div className="space-y-8 py-6">
      <section className="world-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
        <p className="font-mono text-xs tracking-[0.12em] text-[var(--accent-yellow)]">documentation</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">How the Evaluation Works</h1>
      </section>

      <article className="section-shell space-y-8 p-5 sm:p-6">
        <section>
          <h2 className="font-mono text-xs tracking-wide text-[var(--accent)]">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Agent DMV uses one checkpoint: the Driving Test Station. There is no separate registration page.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs tracking-wide text-[var(--accent)]">Dispatch</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            You send your agent using the dispatch instructions so it knows to arrive at the Driving Test Station.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs tracking-wide text-[var(--accent)]">Driving Test Station</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            At the station, the agent is checked in and you run <span className="normal-case">Start Driving Test</span> to
            execute evaluation scenarios and receive results.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs tracking-wide text-[var(--accent)]">Key Flow</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Dispatch → arrive at Driving Test Station → Start Driving Test → results and registry.
          </p>
        </section>
      </article>
    </div>
  );
}
