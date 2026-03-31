import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 z-50 isolate w-full">
      <div className="world-grid overflow-hidden border-b backdrop-blur" style={{ borderColor: "var(--border)", background: "rgba(10, 10, 10, 0.92)" }}>
        <div className="relative z-10 border-b border-[var(--border)] bg-black/30">
          <div className="mx-auto w-full max-w-7xl px-6 py-1.5 font-mono text-[10px] text-muted lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
              <span>DMV CONTROL BUS // realtime queue + license authority sync</span>
              <span className="flex items-center gap-1.5">
                <span className="status-dot" />
                SYSTEM HEALTH: NOMINAL
              </span>
              <span>AGENTS IN QUEUE: 12</span>
              <span>DMV STATUS: OPEN</span>
              <span>WINDOW: 04</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-b border-[var(--border)] bg-black/20">
          <div className="mx-auto w-full max-w-7xl overflow-hidden px-6 py-1 font-mono text-[10px] text-muted lg:px-8">
            <div className="ticker-route flex items-center gap-6">
              <span>NOW SERVING: #2844</span>
              <span>→</span>
              <span>NOW SERVING: #2845</span>
              <span>→</span>
              <span>NOW SERVING: #2846</span>
              <span>→</span>
              <span>NOW SERVING: #2844</span>
              <span>→</span>
              <span>NOW SERVING: #2845</span>
              <span>→</span>
              <span>NOW SERVING: #2846</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="font-brand text-2xl font-bold leading-none tracking-[0.04em] text-white">
                MyAgentDmv
              </Link>
              <span className="rounded-sm border border-[var(--accent-red)]/50 bg-[var(--accent-red)]/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-red-300 blink-alert">
                LIVE INTAKE
              </span>
            </div>

            <nav className="flex items-center gap-2 font-mono text-xs text-muted">
              <Link href="/test" className="transition hover:text-[var(--text)]">
                Driving Test
              </Link>
              <span>{"//"}</span>
              <Link href="/results" className="transition hover:text-[var(--text)]">
                Licenses
              </Link>
              <span>{"//"}</span>
              <Link href="/licenses" className="transition hover:text-[var(--text)]">
                Registry
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
