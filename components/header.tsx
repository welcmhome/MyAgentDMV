import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { MOCK_SESSION_COOKIE, MOCK_SESSION_VALUE } from "@/lib/auth/mock-session";

export async function Header() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get(MOCK_SESSION_COOKIE)?.value === MOCK_SESSION_VALUE;

  return (
    <header className="fixed top-0 z-50 isolate w-full lowercase [&_a.font-brand]:normal-case [&_input]:normal-case [&_textarea]:normal-case [&_select]:normal-case">
      <div className="world-grid border-b backdrop-blur" style={{ borderColor: "var(--border)", background: "rgba(10, 10, 10, 0.92)" }}>
        <div className="relative z-10 hidden border-b border-[var(--border)] bg-black/30 md:block">
          <div className="mx-auto w-full max-w-7xl px-6 py-1.5 font-mono text-[10px] text-muted lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
              <span>
                <span className="normal-case">DMV</span> control bus // realtime queue + license authority sync
              </span>
              <span className="flex items-center gap-1.5">
                <span className="status-dot" />
                system health: nominal
              </span>
              <span>agents in queue: 12</span>
              <span>
                <span className="normal-case">DMV</span> status: open
              </span>
              <span>window: 04</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-b border-[var(--border)] bg-black/20">
          <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-1 font-mono text-[10px] text-muted sm:px-6 lg:px-8">
            <div className="ticker-route flex items-center gap-6">
              <span>now serving: #2844</span>
              <span>→</span>
              <span>now serving: #2845</span>
              <span>→</span>
              <span>now serving: #2846</span>
              <span>→</span>
              <span>now serving: #2844</span>
              <span>→</span>
              <span>now serving: #2845</span>
              <span>→</span>
              <span>now serving: #2846</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex w-full max-w-7xl min-h-[3rem] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex items-baseline gap-0.5">
                <Link href="/" className="font-brand text-xl font-bold leading-none tracking-[0.04em] text-white sm:text-2xl">
                  MyAgentDMV
                </Link>
                <span className="font-mono text-[10px] font-medium text-muted sm:text-[11px]">.v1</span>
              </div>
            </div>

            <SiteHeaderNav isAuthed={isAuthed} />
          </div>
        </div>
      </div>
    </header>
  );
}
