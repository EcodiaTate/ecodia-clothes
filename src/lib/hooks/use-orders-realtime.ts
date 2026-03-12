import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/client";

export interface Order {
  id: string;
  status: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  amount_cents: number;
  tracking_number?: string;
  updated_at: string;
}

export function useOrdersRealtime(userId: string | null, role: "buyer" | "seller" = "buyer") {
  const { supabase } = useSupabase();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      const query = supabase.from("studio_orders").select("*");

      if (role === "buyer") {
        query.eq("buyer_id", userId);
      } else {
        query.eq("seller_id", userId);
      }

      const { data, error } = await query.order("updated_at", {
        ascending: false,
      });

      if (!error && data) {
        setOrders(data as unknown as Order[]);
      }
      setIsLoading(false);
    };

    fetchOrders();

    // Subscribe to order updates
    const filter = role === "buyer" ? `buyer_id=eq.${userId}` : `seller_id=eq.${userId}`;

    const subscription = supabase
      .channel(`orders:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "studio_orders",
          filter,
        },
        (payload: { new: Record<string, unknown>; old: Record<string, unknown>; eventType: string }) => {
          if (payload.eventType === "INSERT") {
            setOrders((prev) => [payload.new as unknown as Order, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setOrders((prev) =>
              prev.map((order) =>
                order.id === (payload.new.id as string)
                  ? (payload.new as unknown as Order)
                  : order
              )
            );
          } else if (payload.eventType === "DELETE") {
            setOrders((prev) => prev.filter((order) => order.id !== (payload.old.id as string)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId, role, supabase]);

  return { orders, isLoading };
}
