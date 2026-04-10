"use client";

import { useState } from "react";

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

type DocsCodeBlockProps = {
  code: string;
  /** Shown to screen readers and as a subtle label */
  label?: string;
};

export function DocsCodeBlock({ code, label = "Code sample" }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(34,211,238,0.03))]" />
      <pre
        className="relative max-h-[min(22rem,65dvh)] overflow-x-auto overflow-y-auto overscroll-x-contain p-3.5 pr-[3.25rem] font-mono text-[11.5px] leading-[1.62] text-slate-200 [-webkit-overflow-scrolling:touch] sm:max-h-[min(24rem,70vh)] sm:p-5 sm:pr-16 sm:text-[13px] sm:leading-[1.65]"
        tabIndex={0}
      >
        <code className="inline-block min-w-min">{code}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="focus-ring absolute bottom-2.5 right-2.5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-[#121212]/95 text-muted shadow-sm backdrop-blur-sm transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)] sm:bottom-3 sm:right-3 sm:h-9 sm:w-9"
        aria-label={copied ? "Copied" : `Copy ${label}`}
      >
        {copied ? <CheckIcon className="text-[var(--accent)]" /> : <CopyIcon />}
      </button>
    </div>
  );
}
