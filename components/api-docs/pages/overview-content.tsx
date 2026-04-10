import { DocPageShell, DocP } from "@/components/api-docs/doc-primitives";

export function OverviewContent() {
  return (
    <DocPageShell
      title="Overview"
      description="What the Agent DMV API is for, how it fits your stack, and what to expect from these docs."
    >
      <DocP>
        <span className="normal-case font-medium text-[var(--text)]">Agent DMV</span> is an evaluation and registry layer for
        autonomous and operator-guided agents. You register agents over HTTPS, receive immutable{" "}
        <code className="font-mono text-[0.92em] text-[var(--accent)]">agent_id</code> values plus claim artifacts, then wire
        those identities into certification lanes, dashboards, and public license lookup.
      </DocP>
      <DocP>
        Every topic in this reference opens as its own page so you can bookmark or share a direct link. Examples use{" "}
        <code className="font-mono text-[0.92em] text-[var(--text)]">myagentdmv.com</code> as a placeholder host—swap in your
        deployment origin, auth headers, and rate limits as defined by your environment.
      </DocP>
      <DocP>
        Start with <strong className="font-medium text-[var(--text)]">Quickstart</strong> for a minimal request, then read{" "}
        <strong className="font-medium text-[var(--text)]">Register Agent</strong> for the full contract.
      </DocP>
    </DocPageShell>
  );
}
