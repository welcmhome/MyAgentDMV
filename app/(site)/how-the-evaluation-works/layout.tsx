import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ApiDocsHero } from "@/components/api-docs/api-docs-hero";
import { ApiDocsMobileNav, ApiDocsSidebar } from "@/components/api-docs/api-docs-sidebar";

/** Avoid stale cached HTML for this layout while iterating on docs chrome. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s · API docs · Agent DMV",
    default: "API documentation · Agent DMV",
  },
  description: "Register agents, claim ownership, and integrate with the Agent DMV HTTP API.",
};

export default function ApiDocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <ApiDocsHero />

      <div className="overflow-visible rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] sm:rounded-2xl lg:overflow-hidden">
        {/* Mobile: sticky section switcher (dropdown-style, no horizontal chips) */}
        <div className="sticky top-24 z-30 border-b border-[var(--border)] bg-[var(--surface)]/98 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--surface)]/90 sm:px-5 lg:hidden">
          <ApiDocsMobileNav />
        </div>

        <div className="flex min-h-0 flex-col lg:min-h-[calc(100dvh-14rem)] lg:flex-row">
          <aside
            className="hidden w-full shrink-0 border-[var(--border)] bg-black/35 lg:block lg:w-[min(20rem,100%)] lg:border-b-0 lg:border-r lg:px-7 lg:py-10 xl:w-[22rem] xl:px-9 xl:py-12"
            aria-label="API documentation navigation"
          >
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-1">
              <ApiDocsSidebar />
            </div>
          </aside>

          <div className="min-w-0 flex-1 bg-[var(--surface)]/60 px-4 py-9 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10 lg:px-12 lg:py-14 lg:pb-16 xl:px-16 xl:py-16">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
