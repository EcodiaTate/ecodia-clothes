"use client";

import { Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderStatusPill } from "./order-status-pill";
import { formatPrice } from "@/lib/constants/clothes";
import type { OrderWithDetails } from "@/lib/actions/clothes";

type Props = {
  order: OrderWithDetails;
  role: "buyer" | "seller";
  onClick?: () => void;
};

export function OrderCard({ order, role, onClick }: Props) {
  const item = order.item;
  const counterparty = role === "buyer" ? order.sellerProfile : order.buyerProfile;
  const images = item && Array.isArray(item.images) ? (item.images as string[]) : [];
  const heroImage = images[0] ?? null;

  return (
    <Card
      interactive
      padding="md"
     
      onClick={onClick}
     
    >
      <div>
        {/* Image */}
        {heroImage ? (
          <img
            src={heroImage}
            alt={item?.title ?? "Item"}
           
          />
        ) : (
          <div
           
           
          >
            <Package />
          </div>
        )}

        <div>
          <div>
            <p>
              {item?.title ?? "Unknown Item"}
            </p>
            <OrderStatusPill status={order.status ?? "pending"} />
          </div>

          <p
           
           
          >
            {formatPrice(order.amount_cents ?? item?.price_cents ?? 0)}
          </p>

          {counterparty && (
            <div>
              {counterparty.avatar_url && (
                <img
                  src={counterparty.avatar_url}
                  alt=""
                 
                />
              )}
              <span>
                {role === "buyer" ? "Seller" : "Buyer"}: {counterparty.display_name ?? "Unknown"}
              </span>
            </div>
          )}

          <p>
            {new Date(order.created_at ?? "").toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
