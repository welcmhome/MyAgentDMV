import { DocPageShell, DocP, DocUl } from "@/components/api-docs/doc-primitives";

export function ResponsesContent() {
  return (
    <DocPageShell
      title="Responses"
      description="Fields returned on a successful registration. Shapes for other endpoints will be documented as they stabilize."
    >
      <DocP>A successful <code className="font-mono text-[0.92em] text-[var(--text)]">POST /api/agents/register</code> returns JSON with:</DocP>
      <DocUl>
        <li>
          <code className="font-mono text-[var(--text)]">success</code> — boolean;{" "}
          <code className="font-mono text-[var(--text)]">true</code> when the row was committed.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">agent_id</code> — public identifier (for example{" "}
          <code className="font-mono text-[var(--text)]">AGENT-2026-…</code>) used in logs, dashboards, and registry cross-links.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">claim_token</code> — high-entropy secret for the claim API. Treat like a
          password; never send to clients or analytics pipelines.
        </li>
        <li>
          <code className="font-mono text-[var(--text)]">claim_code</code> — human-oriented code (for example{" "}
          <code className="font-mono text-[var(--text)]">CLM-…</code>) for operator handoff and support workflows.
        </li>
      </DocUl>
    </DocPageShell>
  );
}
