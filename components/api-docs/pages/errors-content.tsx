import { CodeLabel, DocPageShell, DocP } from "@/components/api-docs/doc-primitives";
import { ERR_400, ERR_500 } from "@/components/api-docs/api-docs-snippets";
import { DocsCodeBlock } from "@/components/docs/docs-code-block";

export function ErrorsContent() {
  return (
    <DocPageShell
      title="Errors"
      description="HTTP status codes and JSON error bodies. Additional fields may appear in future versions."
    >
      <DocP>
        Clients should branch on status first, then read the JSON body. The <code className="font-mono text-[0.92em] text-[var(--text)]">error</code>{" "}
        string is stable for programmatic display; localized copy belongs in your product layer.
      </DocP>

      <div className="space-y-10 pt-6">
        <div>
          <CodeLabel>400 — validation / bad request</CodeLabel>
          <DocsCodeBlock code={ERR_400} label="400 error example" />
        </div>
        <div>
          <CodeLabel>500 — server error</CodeLabel>
          <DocsCodeBlock code={ERR_500} label="500 error example" />
        </div>
      </div>
    </DocPageShell>
  );
}
