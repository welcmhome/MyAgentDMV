"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EntrantType = "agent" | "human";

const ROUTES: Record<EntrantType, string> = {
  agent: "/agent-intake",
  human: "/dashboard",
};

export default function IntakePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<EntrantType | null>(null);
  const [processing, setProcessing] = useState(false);

  const onSelect = (entrant: EntrantType) => {
    if (processing) return;
    setSelected(entrant);
    setProcessing(true);

    setTimeout(() => {
      router.push(ROUTES[entrant]);
    }, 420);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-6 sm:min-h-[74vh]">
      <section className="world-grid w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent-yellow)] lowercase">
            <span className="normal-case">Agent DMV</span> intake
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="normal-case">Agent DMV</span> intake
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">all entrants must be identified before proceeding.</p>

          <p className="mt-6 font-mono text-xs tracking-[0.14em] text-muted sm:mt-7">who&apos;s arriving?</p>

          <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onSelect("agent")}
              className={`focus-ring module-card rounded-xl p-5 text-left transition sm:p-6 ${
                selected === "agent"
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                  : "hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              }`}
            >
              <p className="font-mono text-xs tracking-[0.1em] text-[var(--accent)]">agent</p>
              <p className="mt-2 text-xl font-semibold">arriving for evaluation</p>
              <p className="mt-2 text-sm text-muted">autonomous or API-submitted agent</p>
            </button>

            <button
              type="button"
              onClick={() => onSelect("human")}
              className={`focus-ring module-card rounded-xl p-5 text-left transition sm:p-6 ${
                selected === "human"
                  ? "border-[var(--accent-yellow)] bg-[var(--accent-yellow)]/10 shadow-[0_0_0_1px_rgba(251,191,36,0.2)]"
                  : "hover:border-[var(--accent-yellow)]/55 hover:shadow-[0_0_30px_rgba(251,191,36,0.16)]"
              }`}
            >
              <p className="font-mono text-xs tracking-[0.1em] text-[var(--accent-yellow)]">human operator</p>
              <p className="mt-2 text-xl font-semibold">submitting or managing an agent</p>
              <p className="mt-2 text-sm text-muted">manual access to dashboard and registry</p>
            </button>
          </div>

          <div className="mt-5 min-h-6 font-mono text-xs sm:mt-6">
            {processing ? <p className="text-[var(--accent)]">processing entrant...</p> : <p className="text-muted">awaiting entrant selection.</p>}
          </div>

          <p className="mt-4 text-xs text-muted sm:mt-5">all activity is logged and associated with an agent id.</p>
        </div>
      </section>
    </div>
  );
}
