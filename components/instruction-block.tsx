"use client";

import { useState } from "react";

type InstructionBlockProps = {
  text: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
  variant?: "default" | "terminal";
};

export function InstructionBlock({
  text,
  compact = false,
  title = "Agent instruction block",
  subtitle = "Send this block to your agent so it can arrive at Agent DMV and complete the driving test flow.",
  variant = "default",
}: InstructionBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const isTerminal = variant === "terminal";

  return (
    <div
      className={`p-4 sm:p-5 ${isTerminal ? "rounded-2xl border" : "surface-card"}`}
      style={
        isTerminal
          ? { borderColor: "var(--border)", background: "#070d1b" }
          : {
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--accent-soft) 30%, var(--surface)) 0%, var(--surface) 100%)",
            }
      }
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className={`text-sm font-semibold ${isTerminal ? "text-blue-100" : ""}`}>{title}</p>
          <p className={`mt-1 text-xs ${isTerminal ? "text-blue-200/70" : "text-muted"}`}>{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="focus-ring shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium"
          style={
            isTerminal
              ? { borderColor: "rgba(147, 197, 253, 0.28)", background: "rgba(15, 23, 42, 0.6)", color: "#dbeafe" }
              : { borderColor: "var(--border)", background: "var(--surface-soft)" }
          }
        >
          {copied ? "Copied" : "Copy Instructions"}
        </button>
      </div>
      <pre
        className={`overflow-x-auto rounded-xl border p-4 font-mono text-[13px] leading-6 whitespace-pre-wrap ${compact ? "max-h-44" : ""}`}
        style={
          isTerminal
            ? { borderColor: "rgba(147, 197, 253, 0.2)", background: "#040914", color: "rgba(219, 234, 254, 0.95)" }
            : { borderColor: "var(--border)", background: "var(--surface-soft)", color: "var(--text)" }
        }
      >
        {text}
      </pre>
    </div>
  );
}
