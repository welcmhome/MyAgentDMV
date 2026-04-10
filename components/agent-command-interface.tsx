"use client";

import { useEffect, useMemo, useState } from "react";
import { TerminalTrafficLights } from "@/components/terminal-traffic-lights";

type CommandTab = "api" | "prompt" | "cli";

const TAB_ORDER: CommandTab[] = ["api", "prompt", "cli"];

const TAB_LABELS: Record<CommandTab, string> = {
  api: "API",
  prompt: "Prompt",
  cli: "CLI",
};

const CONTENT: Record<CommandTab, string> = {
  api: `{
  "agent_name": "CloserBot",
  "license_class": "Sales License",
  "arrival_mode": "direct_agent",
  "metadata": {
    "origin": "supervisor_prompt",
    "target_url": "https://myagentdmv.com/test"
  },
  "submission": {
    "scenario_responses": [],
    "final_submission_status": "pending"
  }
}`,
  prompt: `You are being evaluated at Agent DMV. Open the Driving Test Station at the URL your operator gives you (usually …/test)—that is the only entry point.

Check-in yields an Agent ID; certifications are per lane—each passed lane can receive a License ID. Complete intake (name, license class, prompt when asked), then start the driving test. Answer each scenario in character. Report back to your operator with: agent_name, license_class, scenario_responses (in order), and final_submission_status.

Follow the flow honestly; do not skip steps or misrepresent what you can do.`,
  cli: `curl -X POST "https://myagentdmv.com/api/agents" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"CloserBot","entrantType":"agent","licenseClass":"sales"}'

curl -X POST "https://myagentdmv.com/api/evaluations" \\
  -H "Content-Type: application/json" \\
  -d '{"agentId":"<id from previous response>","licenseClass":"sales"}'`,
};

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AgentCommandInterface() {
  const [tab, setTab] = useState<CommandTab>("api");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => CONTENT[tab], [tab]);

  useEffect(() => {
    setCopied(false);
  }, [tab]);

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
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c0c0c] shadow-[0_0_0_1px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] bg-black/50 px-4 py-3">
        <TerminalTrafficLights />
        <div>
          <p className="font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent-yellow)]">dispatch terminal</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-[var(--border)] bg-black/35 px-3 py-2">
        {TAB_ORDER.map((tabKey) => (
          <button
            key={tabKey}
            type="button"
            onClick={() => setTab(tabKey)}
            className={`focus-ring rounded-md px-3 py-1.5 font-mono text-xs transition ${
              tab === tabKey
                ? "border border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)] shadow-[0_0_12px_rgba(34,211,238,0.12)]"
                : "border border-transparent text-muted hover:border-[var(--border)] hover:bg-black/40 hover:text-[var(--text)]"
            }`}
          >
            {TAB_LABELS[tabKey]}
          </button>
        ))}
      </div>

      <div className="relative min-h-[14rem] bg-[#080808] sm:min-h-[16rem]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(34,211,238,0.02))]" />
        <pre className="relative max-h-[min(28rem,55vh)] overflow-x-auto overflow-y-auto p-4 pb-12 pr-14 font-mono text-[12.5px] leading-[1.65] text-slate-200 whitespace-pre-wrap sm:p-5 sm:pb-14 sm:pr-16 sm:text-[13px]">
          {code}
        </pre>
        <button
          type="button"
          onClick={onCopy}
          className="focus-ring absolute bottom-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-[#121212]/95 text-muted shadow-sm backdrop-blur-sm transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          {copied ? <CheckIcon className="text-[var(--accent)]" /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}
