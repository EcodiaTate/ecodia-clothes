"use client";

import { ORDER_STATUS_CONFIG } from "@/lib/constants/clothes";
import type { OrderStatus } from "@/types/domain";

type Props = {
  status: OrderStatus;
  size?: "sm" | "md";
};

export function OrderStatusPill({ status, size = "sm" }: Props) {
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <span
      style={{
        background: `var(--order-${status}-bg)`,
        color: config.colorFg,
      }}
    >
      {config.label}
    </span>
  );
}
