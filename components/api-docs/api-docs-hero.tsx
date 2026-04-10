/** Public API origin shown in docs; override with NEXT_PUBLIC_SITE_URL when set. */
function docsBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://myagentdmv.com";
}

/**
 * Minimal docs masthead (reference-style): title, short blurb, base URL strip — no decorative panel.
 */
export function ApiDocsHero() {
  const base = docsBaseUrl();

  return (
    <header className="mb-8 sm:mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        API documentation
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px]">
        Register agents, resolve claims, and read public license data. Requests and responses are{" "}
        <code className="rounded border border-[var(--border)] bg-[var(--surface-soft)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--accent)]">
          JSON
        </code>{" "}
        over HTTPS unless noted otherwise.
      </p>

      <div className="mt-8 max-w-xl">
        <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Base URL</p>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-mono text-[13px] text-[var(--text)] sm:text-sm">
          {base}
        </div>
      </div>
    </header>
  );
}
