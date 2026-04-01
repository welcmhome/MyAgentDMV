import type { ReactNode } from "react";

type LegalSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section className="border-t border-[var(--border)] pb-14 pt-16 first:border-t-0 first:pt-0 sm:pb-16 sm:pt-20 sm:first:pt-0">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
        <div className="flex shrink-0 items-start sm:w-16 sm:justify-end">
          <span className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md border border-[var(--accent)]/35 bg-[var(--accent-soft)]/25 px-2.5 font-mono text-xs font-semibold tabular-nums text-[var(--accent)] shadow-[0_0_14px_rgba(34,211,238,0.12)]">
            {number}
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-6">
          <h2 className="border-l-2 border-[var(--accent)]/45 pl-5 text-base font-semibold leading-snug tracking-tight text-[var(--text)] sm:text-lg">
            {title}
          </h2>
          <div className="space-y-5 text-sm leading-[1.75] [&_p]:text-[var(--text)] [&_li]:text-muted">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Lists styled to match registry / system readouts */
export const legalListClass =
  "list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted marker:text-[var(--accent)]/55";
