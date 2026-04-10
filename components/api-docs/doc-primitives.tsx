import type { ReactNode } from "react";

export function MethodBadge({ method }: { method: "POST" | "GET" }) {
  /* Flat matte fills — avoid translucent emerald/sky (reads as glow on dark UIs). */
  const post =
    "border border-emerald-800/70 bg-[#0f1a16] text-emerald-500";
  const get = "border border-sky-800/70 bg-[#0f141c] text-sky-400";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${method === "POST" ? post : get}`}
    >
      {method}
    </span>
  );
}

export function EndpointLine({ method, path }: { method: "POST" | "GET"; path: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 gap-y-2.5 rounded-lg border border-[var(--border)] bg-black/40 px-4 py-3 font-mono sm:gap-4 sm:rounded-xl sm:px-5 sm:py-4">
      <MethodBadge method={method} />
      <code className="min-w-0 flex-1 break-all text-[13px] leading-snug text-[var(--text)] sm:text-[14px] md:text-[15px]">{path}</code>
    </div>
  );
}

export function DocPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl pb-20 sm:pb-24 lg:pb-28 xl:max-w-[42rem]">
      <header className="border-b border-[var(--border)] pb-8 sm:pb-10 lg:pb-12">
        <h1 className="text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.35rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-muted sm:mt-5 sm:text-lg sm:leading-[1.75]">{description}</p>
        ) : null}
      </header>
      <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10 lg:mt-12 lg:space-y-12">{children}</div>
    </article>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return <p className="text-base leading-[1.75] text-muted sm:text-[17px] sm:leading-[1.8] md:text-lg">{children}</p>;
}

export function DocUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-outside list-disc space-y-3 pl-5 text-base leading-[1.7] text-muted marker:text-muted sm:space-y-4 sm:text-[17px] sm:leading-[1.75] md:text-lg">
      {children}
    </ul>
  );
}

export function CodeLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 mt-8 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:mb-3 sm:mt-10 sm:text-[11px]">
      {children}
    </p>
  );
}
