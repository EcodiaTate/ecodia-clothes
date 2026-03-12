"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { OrderCard } from "@/components/domain/clothes/order-card";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { getMyOrders } from "@/lib/actions/clothes";
import type { OrderWithDetails } from "@/lib/actions/clothes";

type Role = "buyer" | "seller";

export default function OrdersPage() {
  const router = useRouter();
  const haptics = useHaptic();
  const [role, setRole] = useState<Role>("buyer");
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getMyOrders(role);
      setOrders(data);
    });
  }, [role]);

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

      <h1>My Orders</h1>

      {/* Role toggle */}
      <div>
        {(
          [
            { key: "buyer" as Role, label: "Purchases", icon: <ShoppingBag /> },
            { key: "seller" as Role, label: "Sales", icon: <Package /> },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            style={role === t.key ? { background: "var(--surface-elevated)", color: "var(--text-strong)" } : {}}
            onClick={() => {
              haptics.impact("light");
              setRole(t.key);
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div>
          <div />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<Package />}
          title={role === "buyer" ? "No purchases yet" : "No sales yet"}
          description={role === "buyer" ? "Items you buy will appear here" : "Orders from your store will appear here"}
        />
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              role={role}
              onClick={() => {
                haptics.impact("light");
                router.push(`/orders/${order.id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
