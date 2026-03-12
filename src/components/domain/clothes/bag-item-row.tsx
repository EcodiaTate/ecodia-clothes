"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/constants/clothes";
import { removeFromBag } from "@/lib/actions/clothes";
import { useHaptic } from "@/lib/hooks/use-haptics";
import type { BagItemWithDetail } from "@/lib/actions/clothes";

type Props = {
  bagItem: BagItemWithDetail;
  onRemoved?: () => void;
};

export function BagItemRow({ bagItem, onRemoved }: Props) {
  const haptics = useHaptic();
  const [isPending, startTransition] = useTransition();
  const [removed, setRemoved] = useState(false);

  const item = bagItem.item;
  if (!item || removed) return null;

  const images = Array.isArray(item.images) ? (item.images as string[]) : [];
  const heroImage = images[0] ?? null;

  function handleRemove() {
    haptics.impact("medium");
    startTransition(async () => {
      const result = await removeFromBag(item!.id);
      if (!("error" in result)) {
        setRemoved(true);
        haptics.notify("success");
        onRemoved?.();
      } else {
        haptics.notify("error");
      }
    });
  }

  return (
    <div>
      {/* Thumbnail */}
      {heroImage ? (
        <img
          src={heroImage}
          alt={item.title}
         
        />
      ) : (
        <div
         
         
        />
      )}

      {/* Details */}
      <div>
        <p>{item.title}</p>
        {item.store && (
          <p>@{item.store.handle}</p>
        )}
        <p
         
         
        >
          {formatPrice(item.price_cents ?? 0)}
        </p>
      </div>

      {/* Remove */}
      <Button
        variant="tertiary"
        size="sm"
        loading={isPending}
        onClick={handleRemove}
        aria-label="Remove from bag"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
