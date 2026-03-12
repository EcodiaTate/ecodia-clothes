import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrderMessages } from "@/lib/actions/clothes";
import type { OrderWithDetails } from "@/lib/actions/clothes";
import type { StudioOrder, StudioReview } from "@/types/domain";
import { OrderDetailClient } from "@/components/domain/clothes/order-detail-client";

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { orderId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: rawOrder } = await (supabase
    .from("studio_orders")
    .select(
      "*, item:item_id(id, title, images, price_cents), store:store_id(id, handle), buyerProfile:buyer_id(id, display_name, avatar_url), sellerProfile:seller_id(id, display_name, avatar_url)"
    ) as any)
    .eq("id", orderId)
    .single();

  if (!rawOrder) notFound();

  const orderRaw = rawOrder as unknown as StudioOrder & {
    item: unknown;
    store: unknown;
    buyerProfile: unknown;
    sellerProfile: unknown;
  };

  const order: OrderWithDetails = {
    ...orderRaw,
    item: Array.isArray(orderRaw.item) ? (orderRaw.item[0] ?? null) : (orderRaw.item ?? null),
    store: Array.isArray(orderRaw.store) ? (orderRaw.store[0] ?? null) : (orderRaw.store ?? null),
    buyerProfile: Array.isArray(orderRaw.buyerProfile) ? (orderRaw.buyerProfile[0] ?? null) : (orderRaw.buyerProfile ?? null),
    sellerProfile: Array.isArray(orderRaw.sellerProfile) ? (orderRaw.sellerProfile[0] ?? null) : (orderRaw.sellerProfile ?? null),
  } as OrderWithDetails;

  const role = order.buyer_id === user.id ? "buyer" : "seller";

  if (order.buyer_id !== user.id && order.seller_id !== user.id) {
    notFound();
  }

  const messages = await getOrderMessages(orderId);

  let existingReview = null;
  if (role === "buyer") {
    const { data: review } = await (supabase
      .from("studio_reviews")
      .select("*, reviewer:reviewer_id(display_name, avatar_url)") as any)
      .eq("order_id", orderId)
      .eq("reviewer_id", user.id)
      .maybeSingle();

    if (review) {
      const r = review as unknown as StudioReview & { reviewer: unknown };
      existingReview = {
        ...r,
        reviewer: Array.isArray(r.reviewer) ? (r.reviewer[0] ?? null) : (r.reviewer ?? null),
      } as StudioReview & { reviewer: { display_name: string | null; avatar_url: string | null } | null };
    }
  }

  return (
    <div>
      <OrderDetailClient
        order={order}
        messages={messages}
        existingReview={existingReview}
        currentUserId={user.id}
        role={role}
      />
    </div>
  );
}
