import { DocPageShell, DocP } from "@/components/api-docs/doc-primitives";

export function WebhooksContent() {
  return (
    <DocPageShell
      title="Webhooks"
      description="Event delivery for registrations, claims, and certifications—on the roadmap."
    >
      <p className="inline-flex items-center gap-2">
        <span className="rounded-md border border-[var(--accent-yellow)]/45 bg-[var(--accent-yellow)]/12 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-yellow)]">
          coming soon
        </span>
      </p>
      <DocP>
        We will document signed payloads, retry schedules, idempotency keys, and signature verification for outbound webhooks.
        Until then, poll your own datastore or use server-side integrations triggered by your register flow.
      </DocP>
    </DocPageShell>
  );
}
