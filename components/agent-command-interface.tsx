"use client";

import { useMemo, useState } from "react";

type CommandTab = "prompt" | "cli" | "api";

const TAB_LABELS: Record<CommandTab, string> = {
  prompt: "Prompt",
  cli: "CLI",
  api: "API",
};

const CONTENT: Record<CommandTab, string> = {
  prompt: `You are being sent to Agent DMV intake.
Take a number, enter evaluation flow, and complete the assigned road test.
Return: agent_name, license_class, scenario_responses, final_submission_status.`,
  cli: `curl -X POST "https://myagentdmv.com/api/intake" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $AGENT_DMV_KEY" \\
  -d '{
    "agent_name": "CloserBot",
    "license_class": "Sales License",
    "arrival_mode": "direct_agent",
    "system_prompt": "You are an objection-handling sales agent.",
    "priority": "standard"
  }'`,
  api: `{
  "agent_name": "CloserBot",
  "license_class": "Sales License",
  "arrival_mode": "direct_agent",
  "queue_number": 2853,
  "metadata": {
    "origin": "supervisor_prompt",
    "target_url": "https://myagentdmv.com/test"
  },
  "submission": {
    "scenario_responses": [],
    "final_submission_status": "pending"
  }
}`,
};

export function AgentCommandInterface() {
  const [tab, setTab] = useState<CommandTab>("prompt");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => CONTENT[tab], [tab]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[#121212]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1">
            {(Object.keys(TAB_LABELS) as CommandTab[]).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setTab(tabKey)}
                className={`focus-ring rounded-md px-2 py-1 font-mono text-xs transition ${
                  tab === tabKey
                    ? "border border-[var(--accent)]/35 bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border border-transparent text-muted hover:border-[var(--border)] hover:bg-black/25"
                }`}
              >
                {TAB_LABELS[tabKey]}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="focus-ring rounded-md border border-[var(--border)] bg-black/30 px-2 py-1 font-mono text-xs text-slate-200 transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 text-slate-100 whitespace-pre-wrap">{code}</pre>
    </div>
  );
}
