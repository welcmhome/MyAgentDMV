import type { ReactNode } from "react";

type LegalDocumentShellProps = {
  /** Optional mono label above the title — omit when it would repeat the title. */
  eyebrow?: string;
  title: string;
  dateLine: string;
  children: ReactNode;
};

/**
 * Shared “filing” layout for /terms and /privacy — matches Agent DMV system surfaces without heavy chrome.
 */
export function LegalDocumentShell({ eyebrow, title, dateLine, children }: LegalDocumentShellProps) {
  return (
    <div className="relative pb-16 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(ellipse_70%_80%_at_50%_-30%,rgba(34,211,238,0.09),transparent)]"
        aria-hidden
      />
      <article className="relative mx-auto w-full max-w-5xl">
        <div className="world-grid relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(34,211,238,0.06)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/55 to-transparent"
            aria-hidden
          />
          <header className="relative border-b border-[var(--border)] bg-gradient-to-b from-[#121212] to-[var(--surface)] px-8 py-10 sm:px-14 sm:py-12">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" aria-hidden />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className={`min-w-0 ${eyebrow ? "space-y-3" : "space-y-2"}`}>
                {eyebrow ? (
                  <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-[var(--accent-yellow)]">{eyebrow}</p>
                ) : (
                  <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-[var(--accent-yellow)]/90">
                    legal · public record
                  </p>
                )}
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-[2rem] sm:leading-tight">{title}</h1>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--accent)]/25 bg-black/40 px-4 py-2.5 font-mono text-xs text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <span className="status-dot shrink-0" aria-hidden />
                  <span>{dateLine}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="relative bg-dots-subtle">
            <div className="mx-auto flex max-w-4xl items-stretch gap-7 px-8 py-12 sm:gap-10 sm:px-12 sm:py-16 lg:px-10">
              <div
                className="hidden shrink-0 self-stretch sm:block sm:w-px sm:rounded-full sm:bg-gradient-to-b sm:from-[var(--accent)]/45 sm:via-[var(--accent)]/12 sm:to-transparent"
                aria-hidden
              />
              <div className="min-w-0 flex-1">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
