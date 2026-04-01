"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleOAuthButton } from "@/components/auth/google-oauth-button";
import { AuthDivider } from "@/components/auth/auth-divider";
import { ContinueWithEmailButton } from "@/components/auth/continue-with-email-button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      // TODO: Supabase — replace with signInWithPassword({ email, password })
      const res = await fetch("/api/auth/mock-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      const next = searchParams.get("next") || "/dashboard";
      router.push(next.startsWith("/") ? next : "/dashboard");
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <GoogleOAuthButton />

      <AuthDivider />

      {!showEmailForm ? (
        <ContinueWithEmailButton onClick={() => setShowEmailForm(true)} />
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-2 text-sm lowercase">
            <span className="text-muted">email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[#0a0a0a] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-neutral-600"
              placeholder="you@example.com"
            />
          </label>
          <label className="block space-y-2 text-sm lowercase">
            <span className="text-muted">password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[#0a0a0a] px-3 py-2.5 text-sm text-[var(--text)] outline-none"
            />
          </label>
          {error ? <p className="font-mono text-xs text-[var(--accent-red)]">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="primary-btn focus-ring w-full rounded-xl px-4 py-3 text-sm font-medium lowercase disabled:opacity-60"
          >
            {pending ? "signing in…" : "log in"}
          </button>
        </form>
      )}

      <p className="text-center text-sm lowercase text-muted">
        no account?{" "}
        <Link href="/signup" className="font-medium text-[var(--accent-yellow)] hover:underline">
          sign up
        </Link>
      </p>
    </div>
  );
}
