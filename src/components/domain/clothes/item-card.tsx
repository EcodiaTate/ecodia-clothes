"use client";

import { Recycle } from "lucide-react";
import { formatPrice } from "@/lib/constants/clothes";
import type { ItemWithStore } from "@/lib/actions/clothes";

type Props = {
  item: ItemWithStore;
  onClick?: () => void;
};

const conditionConfig: Record<string, { label: string; badgeClass: string; rotation: string }> = {
  new:      { label: "NEW",      badgeClass: "badge badge-success badge-sticker", rotation: "-2deg" },
  like_new: { label: "LIKE NEW", badgeClass: "badge badge-brass badge-sticker",   rotation: "-1.5deg" },
  good:     { label: "GOOD",     badgeClass: "badge badge-neutral badge-sticker", rotation: "-2.5deg" },
  fair:     { label: "FAIR",     badgeClass: "badge badge-warning badge-sticker", rotation: "-1deg" },
};

export function ItemCard({ item, onClick }: Props) {
  const images = Array.isArray(item.images) ? (item.images as string[]) : [];
  const heroImage = images[0] ?? null;
  const condition = item.condition ?? "good";
  const stock = item.stock ?? 0;
  const isLowStock = stock > 0 && stock <= 3;
  const cfg = conditionConfig[condition] ?? conditionConfig.good;

  const priceFormatted = `$${((item.price_cents ?? 0) / 100).toFixed(2)}`;

  return (
    <div
      className="item-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* Image */}
      <div className="item-card-image">
        {heroImage ? (
          <img src={heroImage} alt={item.title} loading="lazy" />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 10,
              background: "var(--color-bg-secondary)",
              color: "var(--color-text-muted)",
            }}
          >
            <Recycle size={28} strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              No image
            </span>
          </div>
        )}

        {/* Condition sticker - bottom-left */}
        <div className="item-condition-badge">
          <span
            className={cfg.badgeClass}
            style={{ transform: `rotate(${cfg.rotation})` }}
          >
            {cfg.label}
          </span>
        </div>

        {/* Low-stock urgency - top-right */}
        {isLowStock && (
          <div className="item-stock-badge">
            <span className="badge badge-warning badge-sticker">
              {stock} left
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="item-card-body">
        <div className="item-card-price">{priceFormatted}</div>
        <div className="item-card-title">{item.title}</div>
        {item.store && (
          <div className="item-card-store">{item.store.handle}</div>
        )}
      </div>
    </div>
  );
}
