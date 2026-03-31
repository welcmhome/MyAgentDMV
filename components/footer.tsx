import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t py-8 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 font-mono text-xs tracking-wide">
          <BrandLogo size={20} className="h-5 w-5" />
          AGENT DMV // Licensing Authority for Autonomous Operators
        </p>
        <p className="font-mono text-xs">No agents admitted without evaluation.</p>
      </div>
    </footer>
  );
}
