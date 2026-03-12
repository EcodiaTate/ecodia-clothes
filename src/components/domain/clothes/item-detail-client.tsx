"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  MapPin,
  Shield,
  Recycle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConditionBadge } from "./condition-badge";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { addToBag } from "@/lib/actions/clothes";
import { formatPrice, FULFILMENT_TYPE_CONFIG } from "@/lib/constants/clothes";
import type { ItemWithStore } from "@/lib/actions/clothes";

type Props = {
  item: ItemWithStore;
  isOwner: boolean;
};

export function ItemDetailClient({ item, isOwner }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [isPending, startTransition] = useTransition();
  const [bagResult, setBagResult] = useState<{ success: boolean; message: string } | null>(null);

  const images = Array.isArray(item.images) ? (item.images as string[]) : [];
  const materials = Array.isArray(item.materials) ? (item.materials as string[]) : [];
  const tags = Array.isArray(item.tags) ? (item.tags as string[]) : [];
  const provenanceTags = Array.isArray(item.provenance_tags) ? (item.provenance_tags as string[]) : [];
  const safetyFlags = Array.isArray(item.safety_flags) ? (item.safety_flags as string[]) : [];
  const fulfilmentConfig = FULFILMENT_TYPE_CONFIG[item.fulfilment_type ?? "delivery"];

  function handleAddToBag() {
    haptics.impact("heavy");
    setBagResult(null);

    startTransition(async () => {
      const result = await addToBag({ itemId: item.id });
      if ("error" in result) {
        setBagResult({ success: false, message: result.error });
        haptics.notify("error");
      } else {
        setBagResult({ success: true, message: result.message ?? "Added to bag!" });
        haptics.notify("success");
      }
    });
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => {
          haptics.impact("light");
          router.back();
        }}
       
      >
        <ArrowLeft />
        Back
      </button>

      {/* Image gallery */}
      {images.length > 0 ? (
        <div>
          <div>
            {images.map((img, i) => (
              <div
                key={i}
               
              >
                <img
                  src={img}
                  alt={`${item.title} ${i + 1}`}
                 
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <div>
              {images.map((_, i) => (
                <div
                  key={i}
                 
                  style={{
                    background: i === 0 ? "var(--ec-forest-600)" : "var(--ec-gray-300)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
         
         
        >
          <ShoppingBag />
        </div>
      )}

      {/* Title & price */}
      <div>
        <h1>{item.title}</h1>
        <div>
          <span
           
           
          >
            {formatPrice(item.price_cents ?? 0)}
          </span>
          <ConditionBadge condition={item.condition ?? "good"} />
        </div>
      </div>

      {/* Store link */}
      {item.store && (
        <button
          onClick={() => {
            haptics.impact("light");
            router.push(`/store/${item.store!.handle}`);
          }}
         
         
        >
          <Store />
          @{item.store.handle}
        </button>
      )}

      {/* Add to bag */}
      {!isOwner && (item.stock ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="primary"
            fullWidth
            loading={isPending}
            icon={<ShoppingBag />}
            onClick={handleAddToBag}
          >
            Add to Bag
          </Button>
          {bagResult && (
            <p
             
             
            >
              {bagResult.message}
            </p>
          )}
        </motion.div>
      )}

      {(item.stock ?? 0) === 0 && (
        <div
         
         
        >
          Sold Out
        </div>
      )}

      {/* Owner edit */}
      {isOwner && (
        <Button
          variant="secondary"
          fullWidth
          onClick={() => router.push(`/my-store/items/${item.id}/edit`)}
        >
          Edit Listing
        </Button>
      )}

      {/* Description */}
      {item.description && (
        <Card padding="md">
          <p>{item.description}</p>
        </Card>
      )}

      {/* Details grid */}
      <div>
        {/* Fulfilment */}
        <Card padding="md">
          <div>
            {fulfilmentConfig.label.includes("Delivery") || fulfilmentConfig.label.includes("Pickup or") ? (
              <Truck />
            ) : (
              <MapPin />
            )}
            <div>
              <p>{fulfilmentConfig.label}</p>
              <p>{fulfilmentConfig.description}</p>
            </div>
          </div>
        </Card>

        {/* Stock */}
        <Card padding="md">
          <p>Stock</p>
          <p>
            {item.stock ?? 0}
          </p>
        </Card>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3>
            <Tag />
            Tags
          </h3>
          <div>
            {tags.map((tag) => (
              <span
                key={tag}
               
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <div>
          <h3>
            <Recycle />
            Materials
          </h3>
          <div>
            {materials.map((mat) => (
              <span
                key={mat}
               
               
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Provenance */}
      {provenanceTags.length > 0 && (
        <div>
          <h3>
            <Shield />
            Provenance
          </h3>
          <div>
            {provenanceTags.map((tag) => (
              <span
                key={tag}
               
               
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Safety flags */}
      {safetyFlags.length > 0 && (
        <div>
          <h3>
            <Shield />
            Safety Notes
          </h3>
          <div>
            {safetyFlags.map((flag) => (
              <span
                key={flag}
               
               
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category */}
      {item.category && (
        <p>
          Category: <span>{item.category}</span>
        </p>
      )}
    </div>
  );
}
