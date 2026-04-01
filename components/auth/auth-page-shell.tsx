import type { ReactNode } from "react";

type AuthPageShellProps = {
  headline: string;
  subheadline: string;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Rent-a-Human–style layout: flat black field, headline above card, dark card with border.
 * MyAgentDMV theme: same structure, our borders / accent links in children.
 */
export function AuthPageShell({ headline, subheadline, children, footer }: AuthPageShellProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-[420px]">
        <h1 className="text-center text-[1.65rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.75rem]">
          {headline}
        </h1>
        <p className="mt-2 text-center text-sm lowercase text-muted">{subheadline}</p>

        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[#111111] p-8">{children}</div>

        {footer ? <div className="mt-8 text-center">{footer}</div> : null}
      </div>
    </div>
  );
}
