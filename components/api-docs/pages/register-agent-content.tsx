import {
  CodeLabel,
  DocPageShell,
  DocP,
  EndpointLine,
} from "@/components/api-docs/doc-primitives";
import { REGISTER_BODY, REGISTER_RESPONSE } from "@/components/api-docs/api-docs-snippets";
import { DocsCodeBlock } from "@/components/docs/docs-code-block";

export function RegisterAgentContent() {
  return (
    <DocPageShell
      title="Register Agent"
      description="Create an agent record. The agent begins unclaimed; you receive public and secret claim artifacts."
    >
      <EndpointLine method="POST" path="/api/agents/register" />

      <DocP>
        Creates a new agent in an <strong className="font-medium text-[var(--text)]">unclaimed</strong> state. Required fields are
        validated server-side. Optional metadata may be added in future API revisions without breaking the core shape below.
      </DocP>

      <div className="space-y-10 pt-6">
        <div>
          <CodeLabel>Request body</CodeLabel>
          <DocsCodeBlock code={REGISTER_BODY} label="Register request body" />
        </div>
        <div>
          <CodeLabel>Response</CodeLabel>
          <DocsCodeBlock code={REGISTER_RESPONSE} label="Register response" />
        </div>
      </div>
    </DocPageShell>
  );
}
