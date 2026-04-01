export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[#111111] px-3 font-mono text-xs lowercase tracking-wide text-muted">or</span>
      </div>
    </div>
  );
}
