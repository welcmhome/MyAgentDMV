"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

type SiteHeaderNavProps = {
  isAuthed: boolean;
};

export function SiteHeaderNav({ isAuthed }: SiteHeaderNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  const linkClass = "py-2.5 transition hover:text-[var(--text)]";
  const authBlock = isAuthed ? (
    <>
      <Link href="/dashboard" className={linkClass} onClick={close}>
        dashboard
      </Link>
    </>
  ) : (
    <>
      <Link href="/login" className={`${linkClass} text-muted`} onClick={close}>
        login
      </Link>
      <Link
        href="/signup"
        className="primary-btn focus-ring !font-normal mt-1 inline-flex w-fit items-center justify-center !rounded-md px-3 py-2 font-mono text-xs lowercase tracking-normal"
        onClick={close}
      >
        sign up
      </Link>
    </>
  );

  return (
    <div className="relative flex flex-1 items-center justify-end">
      <button
        type="button"
        id={`${panelId}-btn`}
        className="focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-black/35 text-[var(--text)] transition hover:border-[var(--accent)]/40 md:hidden"
        aria-expanded={open}
        aria-controls={`${panelId}-panel`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "close menu" : "open menu"}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="text-current">
          {open ? (
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.75"
              d="M4 4l10 10M14 4L4 14"
            />
          ) : (
            <>
              <rect x="2" y="4.5" width="14" height="1.5" rx="0.5" fill="currentColor" />
              <rect x="2" y="8.25" width="14" height="1.5" rx="0.5" fill="currentColor" />
              <rect x="2" y="12" width="14" height="1.5" rx="0.5" fill="currentColor" />
            </>
          )}
        </svg>
      </button>

      <nav
        className="hidden flex-wrap items-center gap-x-3 gap-y-2 pb-0.5 font-mono text-[11px] text-muted sm:gap-x-4 sm:text-xs md:flex"
        aria-label="Primary"
      >
        <Link href="/test" className="transition hover:text-[var(--text)]">
          driving test
        </Link>
        <span aria-hidden>{"//"}</span>
        <Link href="/results" className="transition hover:text-[var(--text)]">
          licenses
        </Link>
        <span aria-hidden>{"//"}</span>
        <Link href="/licenses" className="transition hover:text-[var(--text)]">
          registry
        </Link>
        {isAuthed ? (
          <>
            <span aria-hidden>{"//"}</span>
            <Link href="/dashboard" className="transition hover:text-[var(--text)]">
              dashboard
            </Link>
          </>
        ) : (
          <>
            <span aria-hidden>{"//"}</span>
            <Link href="/login" className="text-muted transition hover:text-[var(--text)]">
              login
            </Link>
            <Link
              href="/signup"
              className="primary-btn focus-ring !font-normal inline-flex shrink-0 items-center justify-center !rounded-md px-2.5 py-2 font-mono text-[11px] leading-none lowercase tracking-normal sm:text-xs"
            >
              sign up
            </Link>
          </>
        )}
      </nav>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-black/50 md:hidden"
            aria-label="Close menu"
            onClick={close}
          />
          <div
            id={`${panelId}-panel`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panelId}-btn`}
            className="fixed right-4 top-[calc(env(safe-area-inset-top,0px)+5.25rem)] z-[70] w-[min(100vw-2rem,20rem)] rounded-lg border border-[var(--border)] bg-[rgba(10,10,10,0.98)] p-3 shadow-[var(--shadow)] backdrop-blur md:hidden"
          >
            <nav className="flex flex-col font-mono text-sm text-muted" aria-label="Mobile primary">
              <Link href="/test" className={linkClass} onClick={close}>
                driving test
              </Link>
              <Link href="/results" className={linkClass} onClick={close}>
                licenses
              </Link>
              <Link href="/licenses" className={linkClass} onClick={close}>
                registry
              </Link>
              {authBlock}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
