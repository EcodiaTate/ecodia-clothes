"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Package, Truck, MapPin, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemCard } from "./item-card";
import { ReviewCard } from "./review-card";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { STORE_THEME_CONFIG } from "@/lib/constants/clothes";
import type { StoreWithStats } from "@/lib/actions/clothes";
import type { StudioItem, StudioReview } from "@/types/domain";

type ReviewWithReviewer = StudioReview & {
  reviewer: { display_name: string | null; avatar_url: string | null } | null;
};

type Props = {
  store: StoreWithStats & { items: StudioItem[] };
  reviews: ReviewWithReviewer[];
  isOwner: boolean;
};

type Tab = "items" | "reviews" | "info";

export function StoreDetailClient({ store, reviews, isOwner }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [tab, setTab] = useState<Tab>("items");
  const themeConfig = STORE_THEME_CONFIG[store.theme ?? "studio"];

  function handleTabChange(newTab: Tab) {
    haptics.impact("light");
    setTab(newTab);
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

      {/* Store header */}
      <div
       
       
      >
        {store.logo_url ? (
          <img
            src={store.logo_url}
            alt={store.handle ?? "Store"}
           
           
          />
        ) : (
          <div
           
           
          >
            {(store.handle ?? "S")[0].toUpperCase()}
          </div>
        )}

        <div>
          <h1>@{store.handle}</h1>
          {store.bio && <p>{store.bio}</p>}
        </div>

        <div>
          <span>
            <Package />
            <strong>{store.itemCount}</strong> items
          </span>
          {store.avgRating !== null && (
            <span>
              <Star />
              <strong>{store.avgRating.toFixed(1)}</strong> ({store.reviewCount})
            </span>
          )}
        </div>
      </div>

      {/* Owner actions */}
      {isOwner && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push("/my-store")}
        >
          Manage Store
        </Button>
      )}

      {/* Tabs */}
      <div>
        {(
          [
            { key: "items" as Tab, label: `Items (${store.items.length})` },
            { key: "reviews" as Tab, label: `Reviews (${reviews.length})` },
            { key: "info" as Tab, label: "Info" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            style={tab === t.key ? { background: "var(--surface-elevated)", color: "var(--text-strong)" } : {}}
            onClick={() => handleTabChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Items tab */}
      {tab === "items" && (
        <div>
          {store.items.map((item) => (
            <ItemCard
              key={item.id}
              item={{ ...item, store: { id: store.id, handle: store.handle, logo_url: store.logo_url, theme: store.theme } }}
              onClick={() => {
                haptics.impact("light");
                router.push(`/item/${item.id}`);
              }}
            />
          ))}
        </div>
      )}

      {/* Reviews tab */}
      {tab === "reviews" && (
        <Card padding="md">
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </Card>
      )}

      {/* Info tab */}
      {tab === "info" && (
        <div>
          {/* Fulfilment */}
          <Card padding="md">
            <h3>
              <Truck />
              Fulfilment
            </h3>
            <div>
              {store.accepts_delivery && (
                <p>
                  <Truck />
                  Delivery available
                  {(store.delivery_radius_km ?? 0) > 0 && ` (within ${store.delivery_radius_km}km)`}
                </p>
              )}
              {store.accepts_pickup && (
                <p>
                  <MapPin />
                  Pickup available
                </p>
              )}
              {(store.handling_time_days ?? 0) > 0 && (
                <p>Handling time: ~{store.handling_time_days} day{(store.handling_time_days ?? 0) > 1 ? "s" : ""}</p>
              )}
            </div>
          </Card>

          {/* Policies */}
          {(store.shipping_policy || store.return_policy) && (
            <Card padding="md">
              {store.shipping_policy && (
                <div>
                  <h4>
                    <Truck /> Shipping Policy
                  </h4>
                  <p>{store.shipping_policy}</p>
                </div>
              )}
              {store.return_policy && (
                <div>
                  <h4>
                    <RotateCcw /> Return Policy
                  </h4>
                  <p>{store.return_policy}</p>
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
