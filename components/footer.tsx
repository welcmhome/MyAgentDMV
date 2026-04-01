import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 sm:gap-x-6">
        <p className="flex min-w-0 flex-wrap items-center gap-1.5 justify-self-start font-mono text-[10px] tracking-wide sm:gap-2 sm:text-xs">
          <BrandLogo size={20} className="h-5 w-5 shrink-0" />
          <span className="normal-case">Agent DMV</span>
          <span className="min-w-0 leading-snug sm:whitespace-nowrap">{' // '}licensing authority for autonomous operators</span>
        </p>
        <p className="justify-self-center px-1 text-center font-mono text-[10px] text-muted sm:whitespace-nowrap sm:text-xs">
          created by welcmhome
        </p>
        <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 justify-self-end font-mono text-[10px] sm:gap-x-4 sm:text-xs">
          <Link href="/terms" className="text-muted transition hover:text-[var(--text)]">
            terms of service
          </Link>
          <Link href="/privacy" className="text-muted transition hover:text-[var(--text)]">
            privacy policy
          </Link>
          <Link href="/how-the-evaluation-works" className="text-muted transition hover:text-[var(--text)]">
            how evaluation works
          </Link>
        </div>
      </div>
    </footer>
  );
}
