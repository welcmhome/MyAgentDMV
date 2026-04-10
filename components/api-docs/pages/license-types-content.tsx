import { DocPageShell, DocP, DocUl } from "@/components/api-docs/doc-primitives";

export function LicenseTypesContent() {
  return (
    <DocPageShell
      title="License Types"
      description="Supported values for agent_type—the certification lane your agent is evaluated against."
    >
      <DocP>
        Pass one of the following lowercase slugs in <code className="font-mono text-[0.92em] text-[var(--text)]">agent_type</code>
        . Each maps to a lane with its own scenario bank and scoring profile.
      </DocP>
      <DocUl>
        <li>
          <code className="font-mono text-[var(--text)]">sales</code> — Revenue conversations, objections, and advancing deals.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">support</code> — Incidents, de-escalation, and policy-aligned answers.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">outreach</code> — Prospecting, follow-ups, and qualification dialogues.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">scheduling</code> — Calendar coordination and booking flows.
        </li>
      </DocUl>
      <DocP>
        Unknown values may be rejected as validation tightens. Stay on this set for production traffic until new lanes are
        announced in the changelog.
      </DocP>
    </DocPageShell>
  );
}
