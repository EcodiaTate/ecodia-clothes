"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { applyForStore } from "@/lib/actions/clothes";

type Props = {
  onApplied?: () => void;
};

export function StoreApplicationForm({ onApplied }: Props) {
  const haptics = useHaptic();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    haptics.impact("heavy");

    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await applyForStore({
        handle: (form.get("handle") as string).toLowerCase().trim(),
        bio: form.get("bio") as string,
        application_text: form.get("application_text") as string,
      });

      if ("error" in result) {
        setError(result.error);
        haptics.notify("error");
      } else {
        haptics.notify("success");
        onApplied?.();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
         
         
        >
          {error}
        </div>
      )}

      <div>
        <label>Store Handle *</label>
        <div>
          <span>@</span>
          <Input
            name="handle"
            placeholder="my-eco-store"
            required
            pattern="^[a-z0-9_-]+$"
            minLength={3}
            maxLength={30}
          />
        </div>
        <p>Lowercase letters, numbers, hyphens, and underscores only</p>
      </div>

      <div>
        <label>Bio</label>
        <textarea
          name="bio"
          placeholder="Tell people about your store..."
         
          rows={2}
          maxLength={500}
        />
      </div>

      <div>
        <label>Why do you want to sell on ecodia? *</label>
        <textarea
          name="application_text"
          placeholder="Tell us about what you plan to sell, your sustainability practices, and why you'd be a great fit for the Studio marketplace..."
         
          rows={4}
          required
          minLength={20}
          maxLength={2000}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth loading={isPending}>
        Submit Application
      </Button>
    </form>
  );
}
