import { Suspense } from "react";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign in | Agent DMV",
  description: "Sign in to the MyAgentDMV operator console.",
};

export default function LoginPage() {
  return (
    <AuthPageShell headline="sign in to MyAgentDMV" subheadline="sign in to continue to your operator console">
      <Suspense fallback={<p className="text-center text-sm lowercase text-muted">loading…</p>}>
        <LoginForm />
      </Suspense>
    </AuthPageShell>
  );
}
