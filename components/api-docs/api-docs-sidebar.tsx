"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { API_DOCS_NAV, apiDocsPath, type ApiDocsSlug } from "@/components/api-docs/api-docs-nav";

function isActive(pathname: string, slug: ApiDocsSlug): boolean {
  const prefix = apiDocsPath(slug);
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * `usePathname()` can disagree between SSR and the first client paint for *styling* `active`.
 * Desktop sidebar still uses this for highlight after mount.
 */
function usePathnameReadyForNav() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

function currentSectionLabel(pathname: string): string {
  const item = API_DOCS_NAV.find((n) => isActive(pathname, n.slug));
  return item?.label ?? "Overview";
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Mobile: one full-width control — current section + expandable list (no horizontal chip strip).
 */
export function ApiDocsMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const label = currentSectionLabel(pathname);

  return (
    <div ref={panelRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id="api-docs-mobile-section-trigger"
        aria-expanded={open}
        aria-controls="api-docs-mobile-section-panel"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3.5 text-left transition hover:border-[var(--accent)]/25 active:bg-black/30"
      >
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">Current section</p>
          <p className="mt-1 truncate text-base font-semibold tracking-tight text-[var(--text)]">{label}</p>
        </div>
        <Chevron open={open} />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px] lg:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            id="api-docs-mobile-section-panel"
            role="region"
            aria-labelledby="api-docs-mobile-section-trigger"
            className="fixed bottom-0 left-0 right-0 z-[45] max-h-[min(72dvh,32rem)] overflow-y-auto overscroll-contain rounded-t-2xl border border-b-0 border-[var(--border)] bg-[#0e0e0e] px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-12px_40px_rgba(0,0,0,0.55)] lg:hidden"
          >
            <div className="flex justify-center py-2" aria-hidden>
              <span className="h-1 w-11 rounded-full bg-[var(--border)]" />
            </div>
            <p className="px-3 pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">all sections</p>
            <ul className="font-mono text-[15px] leading-snug">
              {API_DOCS_NAV.map((item) => {
                const href = apiDocsPath(item.slug);
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      scroll={false}
                      onClick={() => setOpen(false)}
                      className={`focus-ring flex min-h-12 items-center justify-between gap-3 rounded-xl px-3 py-3 transition ${
                        active
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "text-[var(--text)]/90 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active ? (
                        <svg className="h-4 w-4 shrink-0 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" aria-hidden stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ApiDocsSidebar() {
  const pathname = usePathname();
  const navReady = usePathnameReadyForNav();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 border-b border-[var(--border)] pb-6">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">reference</p>
        <p className="mt-2 font-mono text-sm font-medium text-[var(--text)]">Agent DMV HTTP API</p>
        <p className="mt-2 text-xs leading-relaxed text-muted">Version 1 · JSON over HTTPS</p>
      </div>
      <nav className="min-h-0 flex-1 font-mono text-[13px]" aria-label="Documentation">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">sections</p>
        <ul className="space-y-1">
          {API_DOCS_NAV.map((item) => {
            const href = apiDocsPath(item.slug);
            const active = navReady && isActive(pathname, item.slug);
            return (
              <li key={item.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring flex min-h-11 items-center rounded-lg px-3 py-3 transition sm:min-h-0 sm:py-2.5 ${
                    active
                      ? "border border-[var(--accent)]/35 bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "text-muted hover:bg-black/40 hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-10 hidden border-t border-[var(--border)] pt-6 lg:block">
        <Link href={apiDocsPath("overview")} className="font-mono text-xs text-muted transition hover:text-[var(--accent)]">
          ← overview
        </Link>
      </div>
    </div>
  );
}
