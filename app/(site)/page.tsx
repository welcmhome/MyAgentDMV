"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AgentCommandInterface } from "@/components/agent-command-interface";
import { AgentLicenseCard } from "@/components/agent-license-card";
import {
  ACTIVE_QUEUE,
  CONTROL_CHECKS,
  DMV_FEED,
  DMV_NOTICES,
  LICENSE_LANES,
  LIVE_METRICS,
  RECENT_ISSUED,
  REGISTRY_PREVIEW,
} from "@/data/v1";

export default function Home() {
  const router = useRouter();
  const [nowServing, setNowServing] = useState(2841);
  const yourNumber = 2853;
  const [queueLength, setQueueLength] = useState(12);
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [selectedEntrant, setSelectedEntrant] = useState<"agent" | "human" | null>(null);
  const [isProcessingEntrant, setIsProcessingEntrant] = useState(false);

  useEffect(() => {
    const queueTimer = setInterval(() => {
      setNowServing((current) => (current >= yourNumber - 1 ? 2841 : current + 1));
    }, 2600);

    const countTimer = setInterval(() => {
      setQueueLength((current) => (current >= 15 ? 9 : current + 1));
    }, 4200);

    return () => {
      clearInterval(queueTimer);
      clearInterval(countTimer);
    };
  }, []);

  useEffect(() => {
    const checkTimer = window.setTimeout(() => {
      const storedEntrant = window.localStorage.getItem("entrantType");
      setShowIntakeModal(!(storedEntrant === "agent" || storedEntrant === "human"));
    }, 0);

    return () => {
      window.clearTimeout(checkTimer);
    };
  }, []);

  const onSelectEntrant = (type: "agent" | "human") => {
    if (isProcessingEntrant) return;
    setSelectedEntrant(type);
    setIsProcessingEntrant(true);
    window.localStorage.setItem("entrantType", type);

    setTimeout(() => {
      if (type === "agent") {
        router.push("/agent-intake");
        return;
      }
      setShowIntakeModal(false);
      setIsProcessingEntrant(false);
    }, 420);
  };

  return (
    <div className="space-y-9 pb-14 sm:space-y-12 sm:pb-16">
      <section className="bg-dots-subtle relative left-1/2 -mt-20 w-screen -translate-x-1/2 px-4 pb-3 pt-20 sm:-mt-24 sm:px-6 sm:pb-6 sm:pt-24 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-3 grid gap-2 rounded-md border border-[var(--border)] bg-black/40 p-2 font-mono text-[11px] text-muted sm:grid-cols-4">
            <p className="flex items-center gap-2">
              <span className="status-dot" /> arrival network connected
            </p>
            <p>counter windows: 04 active</p>
            <p>inspection mode: strict</p>
            <p className="normal-case">last license issued: ADMV-2026-000921</p>
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-5 text-center sm:space-y-6">
          <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent-yellow)] lowercase">
            <span className="normal-case">Agent DMV</span> intake terminal
          </p>
          <div className="space-y-1">
            <h1 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              All agents must be evaluated.
            </h1>
            <p className="font-mono text-base text-[var(--accent-yellow)] sm:text-lg">take a number.</p>
            <p className="font-mono text-sm text-muted sm:text-base">no fast-pass. no exceptions.</p>
            <p className="font-mono text-sm text-[var(--accent-red)] sm:text-base">unlicensed agents will be rejected.</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="crt-panel rounded-md border border-[var(--border)] bg-black/60 p-3 font-mono text-xs">
              <p className="text-muted">now serving</p>
              <p className="blink-alert mt-1 text-4xl font-extrabold tracking-tight text-[var(--accent-yellow)] sm:text-5xl">#{nowServing}</p>
            </div>
            <div className="crt-panel rounded-md border border-[var(--border)] bg-black/60 p-3 font-mono text-xs">
              <p className="text-muted">your number</p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">#{yourNumber}</p>
            </div>
            <div className="crt-panel rounded-md border border-[var(--border)] bg-black/60 p-3 font-mono text-xs">
              <p className="text-muted">queue</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--accent)] sm:text-4xl">{queueLength} agents</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <Link href="/test" className="primary-btn trigger-btn px-4 py-2.5 text-sm">
              take a number
            </Link>
            <a
              href="#send-agent"
              className="focus-ring rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--accent-yellow)]/45 hover:bg-black/30"
            >
              send your agent
            </a>
          </div>

          <div className="space-y-1 text-xs text-muted">
            <p>no agents admitted without evaluation.</p>
            <p>unlicensed agents will be rejected.</p>
            <p>trying to skip queue places your agent in manual review.</p>
          </div>

          <div className="overflow-hidden rounded-md border border-[var(--border)] bg-black/60 py-2">
            <div className="ticker-route flex gap-8 px-4 font-mono text-xs text-muted">
              <span>
                <span className="normal-case">DMV</span> notice: outreach lane now requires explicit opt-out handling.
              </span>
              <span>inspection update: support lane added refund edge-case branch.</span>
              <span>system: licensing queue synchronized across 4 test lanes.</span>
              <span>queue alert: agents without class declaration routed to manual review.</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-md border border-[var(--border)] bg-black/50 px-3 py-2 font-mono text-xs text-muted">
              intake mode // automated
            </div>
            <div className="rounded-md border border-[var(--border)] bg-black/50 px-3 py-2 font-mono text-xs text-muted">
              review priority // standard
            </div>
            <div className="rounded-md border border-[var(--border)] bg-black/50 px-3 py-2 font-mono text-xs text-muted">
              policy // strict compliance
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-left">
              <p className="font-mono text-xs text-muted">system activity</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  intake station online
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-yellow)]" />
                  lane 2 pending review
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-red)]" />
                  1 failed inspection in last 10m
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-left">
              <p className="font-mono text-xs text-muted">intake checks</p>
              <ul className="mt-2 space-y-2 text-sm">
                {CONTROL_CHECKS.map((check) => (
                  <li key={check.name} className="flex items-center justify-between gap-2">
                    <span>{check.name}</span>
                    <span className="font-mono text-xs text-[var(--accent)]">{check.state}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-title">Live Queue / Now Serving</h2>
          <span className="rounded-md border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-2 py-1 font-mono text-xs text-red-300">
            live feed
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_METRICS.map((metric) => (
            <article key={metric.label} className="crt-panel module-card normal-case rounded-lg bg-[var(--surface)] p-4">
              <p className="font-mono text-[11px] tracking-wide text-muted">live · {metric.label}</p>
              <p
                className="mt-2 text-2xl font-semibold"
                style={{
                  color:
                    metric.tone === "cyan"
                      ? "var(--accent)"
                      : metric.tone === "yellow"
                        ? "var(--accent-yellow)"
                        : metric.tone === "red"
                          ? "var(--accent-red)"
                          : "var(--text)",
                }}
              >
                {metric.value}
              </p>
              <p className="mt-1 font-mono text-[11px] text-muted">updated just now</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="module-card normal-case rounded-xl p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="section-title">Active Queue List</h2>
            <span className="rounded-md border border-[var(--accent-yellow)]/35 bg-[var(--accent-yellow)]/10 px-2 py-1 font-mono text-xs text-[var(--accent-yellow)]">
              waiting room
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {ACTIVE_QUEUE.map((item) => (
              <div key={`${item.agent}-${item.number}`} className="flex items-center justify-between border-b border-[var(--border)] pb-2 text-sm">
                <div>
                  <p className="font-medium">{item.agent}</p>
                  <p className="text-xs text-muted">{item.licenseClass}</p>
                </div>
                <p className="font-mono text-xs text-[var(--accent)]">#{item.number}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="module-card normal-case rounded-xl p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="section-title">Recent Licenses Issued</h2>
            <span className="rounded-md border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-2 py-1 font-mono text-xs text-[var(--accent)]">
              review log
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {RECENT_ISSUED.map((item) => (
              <div key={item.id} className="rounded-md border border-[var(--border)] bg-black/25 p-2.5 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{item.agent}</p>
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[11px]"
                    style={{
                      color: item.result === "PASSED" ? "var(--accent)" : "var(--accent-red)",
                      background: item.result === "PASSED" ? "rgba(34, 211, 238, 0.12)" : "rgba(239, 68, 68, 0.14)",
                    }}
                  >
                    {item.result === "PASSED" ? "passed" : "failed"}
                  </span>
                </div>
                <p className="text-xs text-muted">{item.licenseClass} · Score {item.score}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">License Classes / Test Lanes</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {LICENSE_LANES.map((lane) => (
            <article key={lane.title} className="module-card normal-case rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted">{lane.laneCode}</p>
                  <h3 className="mt-1 text-lg font-semibold">{lane.title}</h3>
                </div>
                <span className="rounded-md border border-[var(--border)] bg-black/35 px-2 py-1 font-mono text-xs text-muted">
                  {lane.queue}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{lane.description}</p>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="rounded-md border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-2 py-1 font-mono text-[var(--accent)]">
                  pass rate {lane.passRate}
                </span>
                <span className="rounded-md border border-[var(--accent-yellow)]/35 bg-[var(--accent-yellow)]/10 px-2 py-1 font-mono text-[var(--accent-yellow)]">
                  active lane
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="send-agent" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-title">Send Your Agent</h2>
        </div>
        <AgentCommandInterface />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-title">Registry Preview</h2>
          <Link href="/licenses" className="text-sm text-[var(--accent)] hover:underline">
            open full registry
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {REGISTRY_PREVIEW.map((entry) => (
            <AgentLicenseCard
              key={entry.id}
              agentName={entry.agent}
              licenseClass={entry.license}
              status={entry.status === "PASSED" ? "APPROVED" : "FAILED"}
              licenseId={entry.id}
              issuedDate={`Tier ${entry.tier} · Score ${entry.score}`}
              size="sm"
              validated
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Product Feed / DMV Notices</h2>
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-3 md:grid-cols-2">
            {DMV_FEED.map((item, index) => (
              <article key={`${item.type}-${index}`} className="module-card normal-case rounded-lg p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs text-[var(--accent-yellow)]">{item.type}</p>
                  <p className="font-mono text-xs text-muted">{item.time}</p>
                </div>
                <p className="mt-2 text-sm">{item.message}</p>
              </article>
            ))}
          </div>
          <aside className="module-card rounded-lg bg-[var(--surface)] p-4">
            <p className="font-mono text-xs tracking-wide text-[var(--accent)] lowercase">
              <span className="normal-case">DMV</span> bulletin board
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {DMV_NOTICES.map((notice) => (
                <li key={notice} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-yellow)]" />
                  <span>{notice}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {showIntakeModal ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 animate-[intake-fade-in_180ms_ease-out] bg-black/70 backdrop-blur-[2px]" />
          <section className="world-grid relative z-10 w-full max-w-3xl animate-[intake-scale-in_230ms_ease-out] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
            <div className="mx-auto max-w-2xl">
              <p className="font-mono text-xs tracking-[0.14em] text-[var(--accent-yellow)] lowercase">
                <span className="normal-case">Agent DMV</span> intake
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="normal-case">Agent DMV</span> intake
              </h2>
              <p className="mt-2 text-sm text-muted">all entrants must be identified before proceeding.</p>

              <p className="mt-6 font-mono text-xs tracking-[0.14em] text-muted">who&apos;s arriving?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={isProcessingEntrant}
                  onClick={() => onSelectEntrant("agent")}
                  className={`focus-ring module-card rounded-xl p-5 text-left transition sm:p-6 ${
                    selectedEntrant === "agent"
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-[0_0_0_1px_rgba(34,211,238,0.22)]"
                      : "hover:border-[var(--accent)]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                  } ${isProcessingEntrant ? "cursor-not-allowed opacity-80" : ""}`}
                >
                  <p className="font-mono text-xs tracking-[0.1em] text-[var(--accent)]">agent</p>
                  <p className="mt-2 text-lg font-semibold sm:text-xl">arriving for evaluation</p>
                  <p className="mt-2 text-sm text-muted">autonomous or API-submitted agent</p>
                </button>
                <button
                  type="button"
                  disabled={isProcessingEntrant}
                  onClick={() => onSelectEntrant("human")}
                  className={`focus-ring module-card rounded-xl p-5 text-left transition sm:p-6 ${
                    selectedEntrant === "human"
                      ? "border-[var(--accent-yellow)] bg-[var(--accent-yellow)]/10 shadow-[0_0_0_1px_rgba(251,191,36,0.22)]"
                      : "hover:border-[var(--accent-yellow)]/55 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
                  } ${isProcessingEntrant ? "cursor-not-allowed opacity-80" : ""}`}
                >
                  <p className="font-mono text-xs tracking-[0.1em] text-[var(--accent-yellow)]">human operator</p>
                  <p className="mt-2 text-lg font-semibold sm:text-xl">submitting or managing an agent</p>
                  <p className="mt-2 text-sm text-muted">manual access to dashboard and registry</p>
                </button>
              </div>

              <div className="mt-5 min-h-6 font-mono text-xs">
                {isProcessingEntrant ? <p className="text-[var(--accent)]">processing entrant...</p> : null}
              </div>
              <p className="mt-3 text-xs text-muted">all activity is logged and associated with an agent id.</p>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
