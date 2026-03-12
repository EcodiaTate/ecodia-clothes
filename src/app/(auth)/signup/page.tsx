"use client";

import { useActionState, useEffect } from "react";
import { signup } from "@/lib/actions/auth";
import { useHaptic } from "@/lib/hooks/use-haptics";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { LinkButton } from "@/components/ui/link-button";

export default function SignupPage() {
  const haptic = useHaptic();
  const [state, formAction, isPending] = useActionState(signup, null);

  useEffect(() => {
    if (state && "error" in state) haptic.notify("error");
    if (state && "success" in state) haptic.notify("success");
  }, [state, haptic]);

  // Show confirmation UI after successful signup
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
      <h2>Create account</h2>

      {state && "error" in state && (
        <Alert variant="error">{state.error}</Alert>
      )}

      <form action={formAction}>
        <Input
          type="text"
          name="displayName"
          placeholder="Display name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={50}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password (8+ characters)"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          Sign up
        </Button>
      </form>

      <p>
        Already have an account?{" "}
        <Link href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
