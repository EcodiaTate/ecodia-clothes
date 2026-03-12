"use client";

import { Star, Package } from "lucide-react";
import { STORE_THEME_CONFIG } from "@/lib/constants/clothes";
import type { StoreWithStats } from "@/lib/actions/clothes";

type Props = {
  store: StoreWithStats;
  onClick?: () => void;
};

export function StoreCard({ store, onClick }: Props) {
  const themeConfig = STORE_THEME_CONFIG[store.theme ?? "studio"];
  const initial = (store.handle ?? "S")[0].toUpperCase();

  return (
    <div
      className="store-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* Hero image */}
      <div className="store-card-image">
        {store.logo_url ? (
          <img src={store.logo_url} alt={store.handle ?? "Store"} loading="lazy" />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              fontFamily: "var(--font-family-display)",
              fontSize: "4rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              color: "rgba(245, 243, 240, 0.9)",
              background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-brass) 100%)",
            }}
          >
            {initial}
          </div>
        )}

        {/* Theme badge - top-right */}
        <div
          style={{
            position: "absolute",
            top: "var(--spacing-md)",
            right: "var(--spacing-md)",
            zIndex: 3,
          }}
        >
          <span className="badge badge-cream">{themeConfig.label}</span>
        </div>
      </div>

      {/* Overlay body - name + meta */}
      <div className="store-card-body">
        <div className="store-card-name">@{store.handle}</div>

        {store.bio && (
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              color: "rgba(245, 243, 240, 0.8)",
              marginTop: "var(--spacing-xs)",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {store.bio}
          </p>
        )}

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-lg)",
            marginTop: "var(--spacing-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-xs)",
              fontSize: "var(--font-size-xs)",
              fontFamily: "var(--font-family-mono)",
              color: "rgba(245, 243, 240, 0.75)",
              letterSpacing: "0.05em",
            }}
          >
            <Package size={12} strokeWidth={1.75} />
            <span>{store.itemCount} item{store.itemCount !== 1 ? "s" : ""}</span>
          </div>

          {store.avgRating !== null && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-xs)",
                fontSize: "var(--font-size-xs)",
                fontFamily: "var(--font-family-mono)",
                color: "rgba(245, 243, 240, 0.75)",
                letterSpacing: "0.05em",
              }}
            >
              <Star size={12} strokeWidth={1.75} style={{ color: "var(--color-brass-light)" }} />
              <span>{store.avgRating.toFixed(1)}</span>
              <span style={{ opacity: 0.6 }}>({store.reviewCount})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
