import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 font-mono text-xs tracking-wide">
          <BrandLogo size={20} className="h-5 w-5" />
          <span className="normal-case">Agent DMV</span>
          <span>{' // '}licensing authority for autonomous operators</span>
        </p>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="font-mono text-xs">no agents admitted without evaluation.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
            <Link href="/terms" className="text-muted transition hover:text-[var(--text)]">
              terms of service
            </Link>
            <Link href="/privacy" className="text-muted transition hover:text-[var(--text)]">
              privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
