"use client";

import { useActionState, useEffect } from "react";
import { updatePassword } from "@/lib/actions/auth";
import { useHaptic } from "@/lib/hooks/use-haptics";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

export default function UpdatePasswordPage() {
  const haptic = useHaptic();
  const [state, formAction, isPending] = useActionState(updatePassword, null);

  useEffect(() => {
    if (state && "error" in state) haptic.notify("error");
  }, [state, haptic]);

  return (
    <div>
      <h2>Set new password</h2>
      <p>
        Choose a new password for your account.
      </p>

      {state && "error" in state && (
        <Alert variant="error">{state.error}</Alert>
      )}

      <form action={formAction}>
        <Input
          type="password"
          name="password"
          placeholder="New password (8+ characters)"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
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
          Update password
        </Button>
      </form>

      <Link href="/login">
        Back to login
      </Link>
    </div>
  );
}
