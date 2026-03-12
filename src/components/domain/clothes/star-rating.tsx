"use client";

import { Star } from "lucide-react";
import { useHaptic } from "@/lib/hooks/use-haptics";

type Props = {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export function StarRating({ value, onChange, disabled }: Props) {
  const haptics = useHaptic();

  return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => {
              haptics.impact("light");
              onChange(star);
            }}
           
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
          >
            <Star
             
              style={{
                color: star <= value ? "var(--ec-gold-500)" : "var(--ec-gray-300)",
                fill: star <= value ? "var(--ec-gold-500)" : "transparent",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
