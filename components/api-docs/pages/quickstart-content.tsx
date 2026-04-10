import {
  CodeLabel,
  DocPageShell,
  DocP,
} from "@/components/api-docs/doc-primitives";
import {
  AI_PROMPT_EXAMPLE,
  CURL_QUICKSTART,
  FETCH_EXAMPLE,
} from "@/components/api-docs/api-docs-snippets";
import { DocsCodeBlock } from "@/components/docs/docs-code-block";

export function QuickstartContent() {
  return (
    <DocPageShell
      title="Quickstart"
      description="Send one POST with three fields. Copy any example below and run it against your environment."
    >
      <DocP>
        The register endpoint accepts JSON with <code className="font-mono text-[0.92em] text-[var(--text)]">agent_name</code>,{" "}
        <code className="font-mono text-[0.92em] text-[var(--text)]">platform</code>, and{" "}
        <code className="font-mono text-[0.92em] text-[var(--text)]">agent_type</code>. A successful call returns identifiers you
        will store server-side and surface to operators where appropriate.
      </DocP>

      <div className="space-y-10 pt-4">
        <div>
          <CodeLabel>cURL</CodeLabel>
          <DocsCodeBlock code={CURL_QUICKSTART} label="Quickstart cURL" />
        </div>
        <div>
          <CodeLabel>JavaScript (fetch)</CodeLabel>
          <DocsCodeBlock code={FETCH_EXAMPLE} label="Quickstart fetch example" />
        </div>
        <div>
          <CodeLabel>AI / operator instruction block</CodeLabel>
          <DocsCodeBlock code={AI_PROMPT_EXAMPLE} label="AI prompt instruction example" />
        </div>
      </div>
    </DocPageShell>
  );
}
