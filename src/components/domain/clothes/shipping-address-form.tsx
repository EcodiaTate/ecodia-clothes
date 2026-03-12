"use client";

import { useState, useTransition } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveShippingAddress } from "@/lib/actions/clothes";
import { useHaptic } from "@/lib/hooks/use-haptics";
import type { ShippingAddress } from "@/types/domain";

const AU_STATES = [
  { value: "ACT", label: "ACT" },
  { value: "NSW", label: "NSW" },
  { value: "NT", label: "NT" },
  { value: "QLD", label: "QLD" },
  { value: "SA", label: "SA" },
  { value: "TAS", label: "TAS" },
  { value: "VIC", label: "VIC" },
  { value: "WA", label: "WA" },
];

type Props = {
  onSaved?: (address: ShippingAddress) => void;
  onCancel?: () => void;
};

export function ShippingAddressForm({ onSaved, onCancel }: Props) {
  const haptics = useHaptic();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    haptics.impact("medium");

    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await saveShippingAddress({
        line1: form.get("line1") as string,
        line2: (form.get("line2") as string) || undefined,
        city: form.get("city") as string,
        state: form.get("state") as string,
        postcode: form.get("postcode") as string,
        country: "AU",
        label: (form.get("label") as string) || undefined,
        setDefault: form.get("setDefault") === "on",
      });

      if ("error" in result) {
        setError(result.error);
        haptics.notify("error");
      } else {
        haptics.notify("success");
        if (result.address) onSaved?.(result.address);
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
        <label>
          Label <span>(optional)</span>
        </label>
        <Input
          name="label"
          placeholder="Home, Work..."
          autoComplete="off"
        />
      </div>

      <div>
        <label>Address line 1</label>
        <Input
          name="line1"
          placeholder="Street number and name"
          autoComplete="address-line1"
          required
        />
      </div>

      <div>
        <label>
          Address line 2 <span>(optional)</span>
        </label>
        <Input
          name="line2"
          placeholder="Apartment, unit, suite..."
          autoComplete="address-line2"
        />
      </div>

      <div>
        <div>
          <label>City / Suburb</label>
          <Input
            name="city"
            placeholder="Melbourne"
            autoComplete="address-level2"
            required
          />
        </div>
        <div>
          <label>State</label>
          <select name="state" required defaultValue="">
            <option value="" disabled>Select...</option>
            {AU_STATES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Postcode</label>
        <Input
          name="postcode"
          placeholder="3000"
          autoComplete="postal-code"
          maxLength={4}
          pattern="[0-9]{4}"
          required
        />
      </div>

      <label>
        <input type="checkbox" name="setDefault" />
        Set as default address
      </label>

      <div>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => {
              haptics.impact("light");
              onCancel();
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isPending}
          icon={<MapPin />}
        >
          Save Address
        </Button>
      </div>
    </form>
  );
}
