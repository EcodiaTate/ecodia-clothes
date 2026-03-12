"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { BagItemRow } from "./bag-item-row";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { formatPrice } from "@/lib/constants/clothes";
import type { BagItemWithDetail } from "@/lib/actions/clothes";

type Props = {
  initialItems: BagItemWithDetail[];
};

export function BagClient({ initialItems }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [items, setItems] = useState(initialItems);

  const total = items.reduce((sum, b) => {
    if (!b.item) return sum;
    return sum + (b.item.price_cents ?? 0);
  }, 0);

  return (
    <div>
      <button
        onClick={() => {
          haptics.impact("light");
          router.back();
        }}
       
      >
        <ArrowLeft />
        Back
      </button>

      <h1>My Bag</h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag />}
          title="Your bag is empty"
          description="Browse the Studio marketplace to find something you love"
          action={
            <Button
              variant="primary"
              onClick={() => {
                haptics.impact("light");
                router.push("/studio");
              }}
            >
              Browse Studio
            </Button>
          }
        />
      ) : (
        <>
          <div>
            {items.map((bagItem) => (
              <BagItemRow
                key={bagItem.id}
                bagItem={bagItem}
                onRemoved={() => {
                  setItems((prev) => prev.filter((b) => b.id !== bagItem.id));
                }}
              />
            ))}
          </div>

          {/* Total */}
          <div>
            <span>Total</span>
            <span
             
             
            >
              {formatPrice(total)}
            </span>
          </div>

          {/* Checkout button */}
          <Button
            variant="primary"
            fullWidth
            icon={<CreditCard />}
            onClick={() => {
              haptics.impact("heavy");
              router.push("/checkout");
            }}
          >
            Checkout
          </Button>

          <p>
            Secure payment powered by Stripe
          </p>
        </>
      )}
    </div>
  );
}
