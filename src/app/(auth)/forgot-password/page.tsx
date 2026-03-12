"use client";

import { useActionState, useEffect } from "react";
import { forgotPassword } from "@/lib/actions/auth";
import { useHaptic } from "@/lib/hooks/use-haptics";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/link-button";

export default function ForgotPasswordPage() {
  const haptic = useHaptic();
  const [state, formAction, isPending] = useActionState(forgotPassword, null);

  useEffect(() => {
    if (state && "error" in state) haptic.notify("error");
    if (state && "success" in state) haptic.notify("success");
  }, [state, haptic]);

  // Show confirmation UI after submission
  if (state && "success" in state && state.success) {
    return (
      <div>
        <div
         
          style={{
            background: "var(--ec-mint-100)",
            border: "var(--neo-border-thin) solid var(--ec-mint-300)",
            boxShadow: "var(--neo-shadow-sm)",
          }}
        >
          <Mail />
        </div>
        <h2>Check your email</h2>
        <p>{state.message}</p>
        <LinkButton href="/login" variant="tertiary" fullWidth>
          Back to login
        </LinkButton>
      </div>
    );
  }

  return (
    <div>
      <h2>Reset password</h2>
      <p>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {state && "error" in state && (
        <Alert variant="error">{state.error}</Alert>
      )}

      <form action={formAction}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          Send reset link
        </Button>
      </form>

      <Link href="/login">
        Back to login
      </Link>
    </div>
  );
}
