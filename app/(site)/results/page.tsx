import { Suspense } from "react";
import { ResultsContent } from "./results-content";

function ResultsFallback() {
  return (
    <div className="space-y-7 py-4 sm:space-y-8">
      <section className="world-grid animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div className="h-4 w-40 rounded bg-[var(--border)]" />
        <div className="mt-4 h-9 w-2/3 max-w-md rounded bg-[var(--border)]" />
      </section>
      <p className="text-center font-mono text-xs text-muted">resolving results…</p>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <ResultsContent />
    </Suspense>
  );
}
