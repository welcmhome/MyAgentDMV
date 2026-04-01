import Link from "next/link";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create account | Agent DMV",
  description: "Create a MyAgentDMV operator account.",
};

export default function SignupPage() {
  return (
    <AuthPageShell
      headline="join MyAgentDMV"
      subheadline="create an account to get started"
      footer={
        <p className="text-xs lowercase text-muted">
          by signing up you agree to our{" "}
          <Link href="/terms" className="text-[var(--accent)] underline-offset-2 hover:underline">
            terms of service
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthPageShell>
  );
}
