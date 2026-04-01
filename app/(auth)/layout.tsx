import type { ReactNode } from "react";
import { Header } from "@/components/header";

/**
 * Auth routes: same fixed header as the rest of the app; no footer so forms stay focused.
 * Supabase: unchanged; swap forms to call Supabase client when ready.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-24 sm:px-6 sm:pt-28 md:pt-32 lg:px-8 lowercase [&_h1]:normal-case [&_h2]:normal-case [&_h3]:normal-case [&_.section-title]:normal-case [&_a.font-brand]:normal-case [&_input]:normal-case [&_textarea]:normal-case [&_select]:normal-case [&_option]:normal-case [&_pre]:normal-case [&_code]:normal-case">
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
