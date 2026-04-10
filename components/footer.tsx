import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-16 border-t py-10 text-sm sm:mt-20 sm:py-14"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-x-10 md:gap-y-6 lg:gap-x-14">
        <p className="font-mono text-[10px] tracking-wide sm:text-xs md:justify-self-start">
          <span className="normal-case">Agent DMV</span>
        </p>
        <p className="shrink-0 text-center font-mono text-[10px] text-muted sm:text-xs md:justify-self-center md:pt-0.5">
          created by{" "}
          <Link
            href="https://clonet.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline-offset-2 transition hover:text-[var(--text)] hover:underline"
          >
            clonet
          </Link>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 font-mono text-[10px] sm:justify-end sm:gap-x-6 sm:text-xs md:justify-self-end">
          <Link
            href="/terms"
            className="text-muted underline-offset-2 transition hover:text-[var(--text)] hover:underline"
          >
            terms
          </Link>
          <Link
            href="/privacy"
            className="text-muted underline-offset-2 transition hover:text-[var(--text)] hover:underline"
          >
            privacy
          </Link>
          <Link
            href="/how-the-evaluation-works/overview"
            className="text-muted underline-offset-2 transition hover:text-[var(--text)] hover:underline"
          >
            api documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
