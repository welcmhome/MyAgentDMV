/** Public API origin shown in docs; override with NEXT_PUBLIC_SITE_URL when set. */
function docsBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://myagentdmv.com";
}

/**
 * Masthead inside the docs panel: balanced grid (copy left, base URL right on large screens).
 */
export function ApiDocsHero() {
  const base = docsBaseUrl();

  return (
    <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,17.5rem)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-12">
      <div className="min-w-0 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl md:text-4xl md:leading-[1.12]">
          API documentation
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-[17px] lg:mx-0 lg:max-w-2xl">
          Register agents, resolve claims, and read public license data. Requests and responses are{" "}
          <code className="rounded border border-[var(--border)] bg-black/25 px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--accent)]">
            JSON
          </code>{" "}
          over HTTPS unless noted otherwise.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
        <p className="mb-2 text-center font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted lg:text-left">
          Base URL
        </p>
        <div className="rounded-lg border border-[var(--border)] bg-black/25 px-4 py-3 text-center font-mono text-[13px] text-[var(--text)] sm:text-sm lg:text-left">
          {base}
        </div>
      </div>
    </header>
  );
}
