"use client";

import { useActionState, useEffect, useState } from "react";
import { login } from "@/lib/actions/auth";
import { useHaptic } from "@/lib/hooks/use-haptics";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

export default function LoginPage() {
  const haptic = useHaptic();
  const [state, formAction, isPending] = useActionState(login, null);
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    if (state && "error" in state) {
      haptic.notify("error");
    }
  }, [state, haptic]);

  const showPasswordUpdated = params?.get("message") === "password-updated";
  const showAuthError = params?.get("error") === "auth-code-exchange-failed";

  return (
    <div>
      <h2>Log in</h2>

      {showPasswordUpdated && (
        <Alert variant="success">
          Password updated successfully. You can now log in.
        </Alert>
      )}

      {showAuthError && (
        <Alert variant="error">
          Email confirmation failed. Please try again or request a new link.
        </Alert>
      )}

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
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          Log in
        </Button>
      </form>

      <div>
        <Link href="/forgot-password">
          Forgot password?
        </Link>
        <p>
          No account?{" "}
          <Link href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
