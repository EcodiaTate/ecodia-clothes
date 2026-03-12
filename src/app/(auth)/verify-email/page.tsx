"use client";

import { useHaptic } from "@/lib/hooks/use-haptics";
import { Mail } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function VerifyEmailPage() {
  // Hook registered so haptic feedback is available if we add interactions later
  useHaptic();

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

      <p>
        We&apos;ve sent a verification link to your email address. Click the
        link to verify your account.
      </p>

      <p>
        Didn&apos;t receive the email? Check your spam folder or try signing up
        again.
      </p>

      <div>
        <LinkButton href="/login" variant="tertiary" fullWidth>
          Back to login
        </LinkButton>
        <LinkButton href="/signup" variant="secondary" fullWidth>
          Try again
        </LinkButton>
      </div>
    </div>
  );
}
