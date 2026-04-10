import { DocPageShell, DocP } from "@/components/api-docs/doc-primitives";

export function SdkContent() {
  return (
    <DocPageShell
      title="SDK"
      description="Typed clients and packaging—planned after the HTTP contract stabilizes."
    >
      <p className="inline-flex items-center gap-2">
        <span className="rounded-md border border-[var(--accent-yellow)]/45 bg-[var(--accent-yellow)]/12 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-yellow)]">
          coming soon
        </span>
      </p>
      <DocP>
        Official TypeScript and Python SDKs will wrap authentication, retries, and typed errors. For now, use{" "}
        <code className="font-mono text-[0.92em] text-[var(--text)]">fetch</code>, your HTTP client of choice, or the cURL
        examples in Quickstart.
      </DocP>
    </DocPageShell>
  );
}
