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
        <div className="relative z-10 border-b border-[var(--border)] bg-black/25">
          <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-1 font-mono text-[10px] text-muted sm:px-6 lg:px-8">
            <div className="ticker-route flex items-center gap-5">
              <span>
                <span className="normal-case">SLS-01</span> · <span className="normal-case">OUT-02</span> · <span className="normal-case">SUP-03</span> ·{" "}
                <span className="normal-case">SCH-04</span>
              </span>
              <span>→</span>
              <span>strict evaluation · arrivals open</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto flex w-full max-w-7xl min-h-[3rem] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-baseline gap-0.5">
              <Link href="/" className="font-brand text-xl font-bold leading-none tracking-[0.04em] text-white sm:text-2xl">
                aDMV
              </Link>
              <span className="font-mono text-[10px] font-medium text-muted sm:text-[11px]">.v1</span>
            </div>

            <SiteHeaderNav isAuthed={isAuthed} />
          </div>
        </div>
      </div>
    </header>
  );
}
