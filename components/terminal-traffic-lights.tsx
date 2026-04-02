type TerminalTrafficLightsProps = {
  className?: string;
};

export function TerminalTrafficLights({ className = "" }: TerminalTrafficLightsProps) {
  return (
    <div
      className={`flex shrink-0 items-center gap-1.5 ${className}`.trim()}
      aria-hidden
    >
      <span className="h-2.5 w-2.5 rounded-full bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.35)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(52,211,153,0.35)]" />
    </div>
  );
}
