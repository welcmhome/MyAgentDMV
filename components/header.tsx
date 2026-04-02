import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeaderNav } from "@/components/site-header-nav";
import { MOCK_SESSION_COOKIE, MOCK_SESSION_VALUE } from "@/lib/auth/mock-session";

const discordInviteHref =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL?.trim() || "https://discord.com";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

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
            <div className="flex min-w-0 items-center gap-1.5">
              <div className="flex items-baseline gap-0.5">
                <Link href="/" className="font-brand text-xl font-bold leading-none tracking-[0.04em] text-white sm:text-2xl">
                  aDMV
                </Link>
                <span className="font-mono text-[10px] font-medium text-muted sm:text-[11px]">.v1</span>
              </div>
              <Link
                href={discordInviteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-ring -m-0.5 rounded p-0.5"
                aria-label="Discord community"
              >
                <DiscordIcon className="h-[15px] w-[15px] text-[var(--muted)] transition-colors duration-150 group-hover:text-[#5865F2] sm:h-4 sm:w-4" />
              </Link>
            </div>

            <SiteHeaderNav isAuthed={isAuthed} />
          </div>
        </div>
      </div>
    </header>
  );
}
