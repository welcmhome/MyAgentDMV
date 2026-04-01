"use client";

type ContinueWithEmailButtonProps = {
  onClick: () => void;
};

export function ContinueWithEmailButton({ onClick }: ContinueWithEmailButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-600 bg-transparent px-4 py-3.5 text-sm font-medium lowercase text-white transition hover:border-neutral-500 hover:bg-white/[0.04]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5 shrink-0 text-neutral-300"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
      <span>continue with email</span>
    </button>
  );
}
