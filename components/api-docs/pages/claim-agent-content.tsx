import { DocPageShell, DocP, EndpointLine } from "@/components/api-docs/doc-primitives";

export function ClaimAgentContent() {
  return (
    <DocPageShell
      title="Claim Agent"
      description="Bind an unclaimed agent to a verified operator using the artifacts from registration."
    >
      <EndpointLine method="POST" path="/api/agents/claim" />

      <DocP>
        This endpoint transitions an agent from <strong className="font-medium text-[var(--text)]">unclaimed</strong> to a
        verified owner. The server validates the claim code and token against stored hashes; a successful claim associates your
        user or tenant record with the agent.
      </DocP>
      <DocP>
        Request and response schemas, error codes, and idempotency rules will ship with the public claim release. Until then,
        complete registration flows first and keep{" "}
        <code className="font-mono text-[0.92em] text-[var(--text)]">claim_token</code> on the server only—never in browsers,
        logs, or third-party tools.
      </DocP>
    </DocPageShell>
  );
}
